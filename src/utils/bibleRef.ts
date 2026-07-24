/**
 * Maps a scripture reference string (e.g. "Jeremiah 3:14-17") to the USFM
 * book id + chapter + verse numbers used by the Free Use Bible API.
 *
 * References come from the Catholic Readings API in USCCB/English book naming.
 */

// English book name → USFM id (66-book canon served by the free translations).
const BOOK_NAME_TO_USFM: Record<string, string> = {
  genesis: 'GEN', exodus: 'EXO', leviticus: 'LEV', numbers: 'NUM',
  deuteronomy: 'DEU', joshua: 'JOS', judges: 'JDG', ruth: 'RUT',
  '1 samuel': '1SA', '2 samuel': '2SA', '1 kings': '1KI', '2 kings': '2KI',
  '1 chronicles': '1CH', '2 chronicles': '2CH', ezra: 'EZR', nehemiah: 'NEH',
  esther: 'EST', job: 'JOB', psalm: 'PSA', psalms: 'PSA', proverbs: 'PRO',
  ecclesiastes: 'ECC', 'song of songs': 'SNG', 'song of solomon': 'SNG',
  isaiah: 'ISA', jeremiah: 'JER', lamentations: 'LAM', ezekiel: 'EZK',
  daniel: 'DAN', hosea: 'HOS', joel: 'JOL', amos: 'AMO', obadiah: 'OBA',
  jonah: 'JON', micah: 'MIC', nahum: 'NAM', habakkuk: 'HAB', zephaniah: 'ZEP',
  haggai: 'HAG', zechariah: 'ZEC', malachi: 'MAL',
  matthew: 'MAT', mark: 'MRK', luke: 'LUK', john: 'JHN', acts: 'ACT',
  romans: 'ROM', '1 corinthians': '1CO', '2 corinthians': '2CO',
  galatians: 'GAL', ephesians: 'EPH', philippians: 'PHP', colossians: 'COL',
  '1 thessalonians': '1TH', '2 thessalonians': '2TH', '1 timothy': '1TI',
  '2 timothy': '2TI', titus: 'TIT', philemon: 'PHM', hebrews: 'HEB',
  james: 'JAS', '1 peter': '1PE', '2 peter': '2PE', '1 john': '1JN',
  '2 john': '2JN', '3 john': '3JN', jude: 'JUD', revelation: 'REV',
};

// Deuterocanonical books not present in the free Protestant-canon translations.
const DEUTERO_NAMES = new Set([
  'tobit', 'judith', 'wisdom', 'sirach', 'ecclesiasticus', 'baruch',
  '1 maccabees', '2 maccabees',
]);

export interface ParsedReference {
  bookId: string;
  chapter: number;
  /** verse numbers to show; null = whole chapter */
  verses: number[] | null;
}

export type ReferenceResult =
  | { ok: true; ref: ParsedReference }
  | { ok: false; reason: 'deuterocanonical' | 'unparseable' };

/** Expands a verse spec like "10, 11-12abcd, 13" into [10,11,12,13]. */
function parseVerseSpec(spec: string): number[] | null {
  const nums: number[] = [];
  for (const rawPart of spec.split(',')) {
    const part = rawPart.replace(/[a-z]/gi, '').trim(); // strip 'a','b' suffixes
    if (!part) continue;
    const range = part.split(/[-–—]/).map(s => parseInt(s.trim(), 10));
    if (range.some(isNaN)) continue;
    if (range.length === 1) nums.push(range[0]);
    else for (let n = range[0]; n <= range[1]; n++) nums.push(n);
  }
  return nums.length ? Array.from(new Set(nums)).sort((a, b) => a - b) : null;
}

export function parseReference(reference: string): ReferenceResult {
  const ref = reference.trim();
  // Capture: book (optional leading digit) + chapter + verse-spec.
  const m = ref.match(/^(\d?\s?[A-Za-z][A-Za-z '.]*?)\s+(\d+):(.+)$/);
  if (!m) return { ok: false, reason: 'unparseable' };

  const bookName = m[1].toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim();
  const chapter = parseInt(m[2], 10);
  const verseSpec = m[3];

  if (DEUTERO_NAMES.has(bookName)) return { ok: false, reason: 'deuterocanonical' };

  const bookId = BOOK_NAME_TO_USFM[bookName];
  if (!bookId) return { ok: false, reason: 'unparseable' };

  // Cross-chapter refs (another ':' in the spec) → fall back to whole chapter.
  const verses = verseSpec.includes(':') ? null : parseVerseSpec(verseSpec);
  return { ok: true, ref: { bookId, chapter, verses } };
}
