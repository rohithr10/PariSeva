import apiClient from './client';
import type { ApiResponse, DailyReading, Bookmark } from '../types';

export const bibleApi = {
  getDailyReading: (date?: string) =>
    apiClient.get<ApiResponse<DailyReading>>('/bible/daily-reading', { params: { date } }),

  getBookmarks: () => apiClient.get<ApiResponse<Bookmark[]>>('/bible/bookmarks'),

  addBookmark: (verse: Omit<Bookmark, '_id' | 'userId' | 'createdAt'>) =>
    apiClient.post<ApiResponse<Bookmark>>('/bible/bookmarks', verse),

  removeBookmark: (bookmarkId: string) =>
    apiClient.delete(`/bible/bookmarks/${bookmarkId}`),
};
