import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DailyReading, Bookmark, BibleBook } from '../../types';

interface BibleState {
  dailyReading: DailyReading | null;
  books: BibleBook[];
  bookmarks: Bookmark[];
  currentBook: string | null;
  currentChapter: number;
  currentVerse: number | null;
  language: 'en' | 'ta';
  fontSize: number;
  nightMode: boolean;
  loading: boolean;
}

const initialState: BibleState = {
  dailyReading: null,
  books: [],
  bookmarks: [],
  currentBook: null,
  currentChapter: 1,
  currentVerse: null,
  language: 'en',
  fontSize: 17,
  nightMode: false,
  loading: false,
};

const bibleSlice = createSlice({
  name: 'bible',
  initialState,
  reducers: {
    setDailyReading: (state, action: PayloadAction<DailyReading>) => {
      state.dailyReading = action.payload;
    },
    setBooks: (state, action: PayloadAction<BibleBook[]>) => {
      state.books = action.payload;
    },
    setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
      state.bookmarks = action.payload;
    },
    /** Restores the persisted reader preferences + bookmarks on app launch. */
    hydrateBible: (
      state,
      action: PayloadAction<{
        bookmarks?: Bookmark[];
        nightMode?: boolean;
        fontSize?: number;
      }>,
    ) => {
      state.bookmarks = action.payload.bookmarks ?? [];
      state.nightMode = action.payload.nightMode ?? false;
      if (action.payload.fontSize) state.fontSize = action.payload.fontSize;
    },
    /** Adds the verse if it isn't bookmarked yet, removes it if it is. */
    toggleBookmark: (state, action: PayloadAction<Bookmark>) => {
      const { bookId, book, chapter, verse } = action.payload;
      const existing = state.bookmarks.find(
        b =>
          b.chapter === chapter &&
          b.verse === verse &&
          (bookId ? b.bookId === bookId : b.book === book),
      );
      state.bookmarks = existing
        ? state.bookmarks.filter(b => b._id !== existing._id)
        : [action.payload, ...state.bookmarks];
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks = [action.payload, ...state.bookmarks];
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(b => b._id !== action.payload);
    },
    setCurrentPosition: (
      state,
      action: PayloadAction<{ book: string; chapter: number; verse?: number }>,
    ) => {
      state.currentBook = action.payload.book;
      state.currentChapter = action.payload.chapter;
      state.currentVerse = action.payload.verse ?? null;
    },
    setBibleLanguage: (state, action: PayloadAction<'en' | 'ta'>) => {
      state.language = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = Math.min(24, Math.max(13, action.payload));
    },
    toggleNightMode: state => {
      state.nightMode = !state.nightMode;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setDailyReading,
  setBooks,
  setBookmarks,
  hydrateBible,
  toggleBookmark,
  addBookmark,
  removeBookmark,
  setCurrentPosition,
  setBibleLanguage,
  setFontSize,
  toggleNightMode,
  setLoading,
} = bibleSlice.actions;

export const selectDailyReading = (state: { bible: BibleState }) =>
  state.bible.dailyReading;
export const selectBibleBooks = (state: { bible: BibleState }) => state.bible.books;
export const selectBookmarks = (state: { bible: BibleState }) => state.bible.bookmarks;
export const selectBibleLanguage = (state: { bible: BibleState }) => state.bible.language;
export const selectFontSize = (state: { bible: BibleState }) => state.bible.fontSize;
export const selectNightMode = (state: { bible: BibleState }) => state.bible.nightMode;

/** True when the given verse is already bookmarked. */
export const isVerseBookmarked = (
  bookmarks: Bookmark[],
  bookId: string,
  chapter: number,
  verse: number,
) => bookmarks.some(b => b.bookId === bookId && b.chapter === chapter && b.verse === verse);

export default bibleSlice.reducer;
