import axios from 'axios';
import { BIBLE_API_BASE } from '../constants/bible';
import { parseReference } from '../utils/bibleRef';

/**
 * Dedicated client for the public Free Use Bible API. It must NOT carry the
 * app's auth headers or base URL, so it uses its own axios instance.
 */
const bibleClient = axios.create({
  baseURL: BIBLE_API_BASE,
  timeout: 15000,
});

export interface BibleBookMeta {
  id: string; // USFM code, e.g. "GEN"
  name: string; // localized name for the translation
  numberOfChapters: number;
  order: number;
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  bookName: string;
  chapter: number;
  numberOfChapters: number;
  verses: BibleVerse[];
}

// ── Raw API shapes (only the fields we use) ──
interface RawBooksResponse {
  books: BibleBookMeta[];
}
type RawContentItem =
  | { type: 'verse'; number: number; content: RawVerseContent[] }
  | { type: 'heading'; content: string[] }
  | { type: string; [k: string]: unknown };
type RawVerseContent = string | { text?: string; noteId?: number; poem?: number };
interface RawChapterResponse {
  book: { name: string; numberOfChapters: number };
  chapter: { number: number; content: RawContentItem[] };
}

/** Flattens a verse's mixed content array (strings, poem lines, footnote refs) into plain text. */
function extractVerseText(content: RawVerseContent[]): string {
  return content
    .map(part => {
      if (typeof part === 'string') return part;
      if (part && typeof part.text === 'string') return part.text;
      return ''; // footnote refs / unknown markers
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const bibleContentApi = {
  async getBooks(translation: string): Promise<BibleBookMeta[]> {
    const res = await bibleClient.get<RawBooksResponse>(`/${translation}/books.json`);
    return res.data.books;
  },

  async getChapter(
    translation: string,
    bookId: string,
    chapter: number,
  ): Promise<BibleChapter> {
    const res = await bibleClient.get<RawChapterResponse>(
      `/${translation}/${bookId}/${chapter}.json`,
    );
    const { book, chapter: ch } = res.data;
    const verses: BibleVerse[] = ch.content
      .filter((it): it is Extract<RawContentItem, { type: 'verse' }> => it.type === 'verse')
      .map(v => ({ number: v.number, text: extractVerseText(v.content) }));

    return {
      bookName: book.name,
      chapter: ch.number,
      numberOfChapters: book.numberOfChapters,
      verses,
    };
  },

  /**
   * Resolves a scripture reference (e.g. "Jeremiah 3:14-17") to its verse text
   * in the given translation. Returns `available: false` for deuterocanonical
   * or unparseable references so callers can show the citation + a note.
   */
  async getVersesForRef(
    translation: string,
    reference: string,
  ): Promise<{ available: boolean; text: string }> {
    const parsed = parseReference(reference);
    if (!parsed.ok) return { available: false, text: '' };

    const { bookId, chapter, verses } = parsed.ref;
    try {
      const ch = await this.getChapter(translation, bookId, chapter);
      const wanted = verses
        ? ch.verses.filter(v => verses.includes(v.number))
        : ch.verses;
      const text = wanted.map(v => v.text).join(' ').trim();
      return { available: text.length > 0, text };
    } catch {
      return { available: false, text: '' };
    }
  },
};
