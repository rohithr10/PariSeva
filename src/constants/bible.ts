import type { AppLanguage } from '../i18n';

/**
 * Bible text is served by the Free Use Bible API (https://bible.helloao.org)
 * — no API key, no rate limits, public-domain translations. This is a
 * third-party public API, so it is called directly (not through the
 * authenticated app apiClient).
 */
export const BIBLE_API_BASE = 'https://bible.helloao.org/api';

/**
 * App language → translation id on the Free Use Bible API.
 *  - en: Berean Standard Bible (modern, public domain)
 *  - ta: Tamil Indian Revised Version
 *
 * NOTE: both are the 66-book Protestant canon. The API has no free Catholic
 * edition, so the deuterocanonical books (Tobit, Judith, Wisdom, Sirach,
 * Baruch, 1–2 Maccabees) are not available and are flagged in the UI.
 */
export const BIBLE_TRANSLATIONS: Record<AppLanguage, string> = {
  en: 'BSB',
  ta: 'tam_irv',
};

export function translationFor(lang: AppLanguage): string {
  return BIBLE_TRANSLATIONS[lang] ?? BIBLE_TRANSLATIONS.en;
}

/** The "other" language, used for parallel/interlinear reading. */
export function otherLanguage(lang: AppLanguage): AppLanguage {
  return lang === 'en' ? 'ta' : 'en';
}

/** USFM ids of the 27 New Testament books (everything else is Old Testament). */
export const NT_BOOK_IDS = new Set([
  'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
  'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS',
  '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV',
]);

/**
 * Deuterocanonical (Catholic) books not present in the free Protestant-canon
 * translations. Shown in the book list as "coming soon" so the Catholic
 * canon is still represented. Keyed by English name with a Tamil label.
 */
export const DEUTEROCANONICAL_BOOKS: { name: string; nameTA: string }[] = [
  { name: 'Tobit', nameTA: 'தொபியாஸ்' },
  { name: 'Judith', nameTA: 'யூதித்' },
  { name: 'Wisdom', nameTA: 'ஞானாகமம்' },
  { name: 'Sirach', nameTA: 'சீராக்' },
  { name: 'Baruch', nameTA: 'பாரூக்' },
  { name: '1 Maccabees', nameTA: '1 மக்கபேயர்' },
  { name: '2 Maccabees', nameTA: '2 மக்கபேயர்' },
];
