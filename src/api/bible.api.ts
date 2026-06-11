import apiClient from './client';
import type { ApiResponse, BibleBook, BibleVerse, DailyReading, Bookmark } from '../types';

export const bibleApi = {
  getBooks: () =>
    apiClient.get<ApiResponse<BibleBook[]>>('/bible/books'),

  getChapter: (bookId: string, chapter: number, lang: 'en' | 'ta' = 'en') =>
    apiClient.get<ApiResponse<BibleVerse[]>>(
      `/bible/books/${bookId}/chapters/${chapter}`,
      { params: { lang } },
    ),

  getDailyReading: () =>
    apiClient.get<ApiResponse<DailyReading>>('/bible/reading/today'),

  searchVerses: (query: string, lang: 'en' | 'ta' = 'en') =>
    apiClient.get<ApiResponse<BibleVerse[]>>('/bible/search', { params: { q: query, lang } }),

  getBookmarks: () =>
    apiClient.get<ApiResponse<Bookmark[]>>('/bible/bookmarks'),

  addBookmark: (verse: Omit<Bookmark, '_id' | 'userId' | 'createdAt'>) =>
    apiClient.post<ApiResponse<Bookmark>>('/bible/bookmarks', verse),

  removeBookmark: (bookmarkId: string) =>
    apiClient.delete(`/bible/bookmarks/${bookmarkId}`),
};
