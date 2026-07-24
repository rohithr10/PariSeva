import { useQuery } from '@tanstack/react-query';
import { dailyReadingsApi, type ReadingRef, type ReadingType } from '../api/dailyReadings.api';
import { bibleContentApi } from '../api/bibleContent.api';
import { translationFor } from '../constants/bible';
import type { AppLanguage } from '../i18n';

export interface ReadingText {
  available: boolean;
  text: string;
}

/** Feast, season and reading references for a date (language-independent). */
export function useDailyMeta(date: Date) {
  const key = date.toISOString().slice(0, 10);
  return useQuery({
    queryKey: ['dailyReadings', 'meta', key],
    queryFn: () => dailyReadingsApi.getMeta(date),
    staleTime: 1000 * 60 * 60, // an hour; readings change once a day
    retry: 1,
  });
}

/** Verse text for each reading, in the given language. */
export function useReadingTexts(
  readings: ReadingRef[] | undefined,
  lang: AppLanguage,
  dateKey: string,
  enabled = true,
) {
  const translation = translationFor(lang);
  const refs = (readings ?? []).map(r => `${r.type}:${r.reference}`).join('|');

  return useQuery({
    queryKey: ['dailyReadings', 'text', dateKey, translation, refs],
    enabled: enabled && !!readings && readings.length > 0,
    staleTime: Infinity,
    queryFn: async (): Promise<Record<ReadingType, ReadingText>> => {
      const entries = await Promise.all(
        (readings ?? []).map(async r => {
          const res = await bibleContentApi.getVersesForRef(translation, r.reference);
          return [r.type, res] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<ReadingType, ReadingText>;
    },
  });
}
