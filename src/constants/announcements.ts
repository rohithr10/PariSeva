import type { Announcement } from '../types';

/**
 * Parish announcements the app starts with. They live in the church slice so
 * the Admin screen, the drawer Announcements list and the Home feed all read
 * the same source — anything posted from Admin shows up everywhere at once.
 */
export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    _id: 'a1',
    churchId: 'c1',
    title: 'Sunday Mass Change',
    titleTA: 'ஞாயிறு திருப்பலி மாற்றம்',
    content:
      'Sunday 9:30 AM Mass moved to 10:00 AM this week due to diocesan programme.',
    type: 'mass_change',
    priority: 'high',
    publishedAt: '2026-06-05T09:00:00.000Z',
  },
  {
    _id: 'a2',
    churchId: 'c1',
    title: 'Youth Annual Sports Day',
    titleTA: 'இளைஞர் ஆண்டு விளையாட்டு நாள்',
    content:
      'Youth Annual Sports Day on June 22. Register with the Youth Club before June 18.',
    type: 'event',
    priority: 'normal',
    publishedAt: '2026-06-03T09:00:00.000Z',
  },
  {
    _id: 'a3',
    churchId: 'c1',
    title: 'Parish Meeting',
    titleTA: 'பங்கு ஆலோசனை கூட்டம்',
    content: 'Monthly parish council meeting on June 10 at 7 PM in the parish hall.',
    type: 'general',
    priority: 'normal',
    publishedAt: '2026-06-01T09:00:00.000Z',
  },
  {
    _id: 'a4',
    churchId: 'c1',
    title: 'Feast Day Preparations',
    titleTA: 'திருவிழா ஏற்பாடுகள்',
    content:
      'Volunteers needed for Sacred Heart Feast Day preparations on June 18. Contact the parish office.',
    type: 'event',
    priority: 'high',
    publishedAt: '2026-05-28T09:00:00.000Z',
  },
  {
    _id: 'a5',
    churchId: 'c1',
    title: "New Women's Club Members",
    titleTA: 'புதிய மாதர் சங்கம்',
    content:
      'New membership drive for the Madar Sangam. All women above 18 are welcome.',
    type: 'general',
    priority: 'normal',
    publishedAt: '2026-05-20T09:00:00.000Z',
  },
];

/** Formats an announcement date the way the announcement lists display it. */
export function formatAnnouncementDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = Date.now() - date.getTime();
  if (diffMs >= 0 && diffMs < 60 * 60 * 1000) return 'Just now';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
