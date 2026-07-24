import axios from 'axios';

/**
 * Catholic daily readings + liturgical calendar, from the free, no-key
 * Catholic Readings API (https://github.com/cpbjr/catholic-readings-api,
 * served via GitHub Pages, USCCB-sourced). Provides the feast/season and the
 * reading *references* — the verse text itself is fetched separately from the
 * Free Use Bible API so it can be shown in the app's language.
 */
const READINGS_BASE = 'https://cpbjr.github.io/catholic-readings-api';

const readingsClient = axios.create({ baseURL: READINGS_BASE, timeout: 15000 });

export type ReadingType = 'first' | 'psalm' | 'second' | 'gospel';

export interface ReadingRef {
  type: ReadingType;
  label: string;
  reference: string;
}

export interface DailyReadingMeta {
  date: string; // ISO
  season: string;
  feastName?: string;
  feastQuote?: string;
  usccbLink?: string;
  readings: ReadingRef[];
}

interface RawReadings {
  date: string;
  season?: string;
  readings?: {
    firstReading?: string;
    psalm?: string;
    secondReading?: string;
    gospel?: string;
  };
  usccbLink?: string;
}
interface RawCalendar {
  celebration?: { name?: string; quote?: string };
}

const LABELS: Record<ReadingType, string> = {
  first: 'First Reading',
  psalm: 'Responsorial Psalm',
  second: 'Second Reading',
  gospel: 'Gospel',
};

/** date -> "2026/07-24" path segment. */
function datePath(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}-${d}`;
}

export const dailyReadingsApi = {
  async getMeta(date: Date): Promise<DailyReadingMeta> {
    const path = datePath(date);
    // Readings are required; the calendar (feast) is best-effort.
    const [readingsRes, calRes] = await Promise.allSettled([
      readingsClient.get<RawReadings>(`/readings/${path}.json`),
      readingsClient.get<RawCalendar>(`/liturgical-calendar/${path}.json`),
    ]);

    if (readingsRes.status !== 'fulfilled') {
      throw new Error('Readings not available for this date');
    }
    const raw = readingsRes.value.data;
    const r = raw.readings ?? {};

    const readings: ReadingRef[] = [];
    if (r.firstReading) readings.push({ type: 'first', label: LABELS.first, reference: r.firstReading });
    if (r.psalm) readings.push({ type: 'psalm', label: LABELS.psalm, reference: r.psalm });
    if (r.secondReading) readings.push({ type: 'second', label: LABELS.second, reference: r.secondReading });
    if (r.gospel) readings.push({ type: 'gospel', label: LABELS.gospel, reference: r.gospel });

    const cal = calRes.status === 'fulfilled' ? calRes.value.data.celebration : undefined;

    return {
      date: raw.date,
      season: raw.season ?? '',
      feastName: cal?.name,
      feastQuote: cal?.quote,
      usccbLink: raw.usccbLink,
      readings,
    };
  },
};
