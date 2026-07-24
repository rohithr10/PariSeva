import { useQuery } from '@tanstack/react-query';
import { bibleContentApi } from '../api/bibleContent.api';
import { translationFor } from '../constants/bible';
import type { AppLanguage } from '../i18n';

// Bible text is immutable — cache aggressively.
const STATIC = { staleTime: Infinity, gcTime: 1000 * 60 * 60 * 24, retry: 1 };

/** Localized book list for the given app language. */
export function useBibleBooks(lang: AppLanguage) {
  const translation = translationFor(lang);
  return useQuery({
    queryKey: ['bible', 'books', translation],
    queryFn: () => bibleContentApi.getBooks(translation),
    ...STATIC,
  });
}

/**
 * Verses for a chapter in the given language.
 * `enabled` lets callers lazily fetch the parallel translation.
 */
export function useBibleChapter(
  lang: AppLanguage,
  bookId: string,
  chapter: number,
  enabled = true,
) {
  const translation = translationFor(lang);
  return useQuery({
    queryKey: ['bible', 'chapter', translation, bookId, chapter],
    queryFn: () => bibleContentApi.getChapter(translation, bookId, chapter),
    enabled: enabled && !!bookId && chapter >= 1,
    ...STATIC,
  });
}
