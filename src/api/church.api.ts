import apiClient from './client';
import type { ApiResponse, Church, MassTiming, LiveStream, Announcement, Diocese } from '../types';

export const churchApi = {
  // Public directory; backend filters on `search`
  search: (query: string, page = 1) =>
    apiClient.get<ApiResponse<Church[]>>('/churches', { params: { search: query, page } }),

  getById: (id: string) => apiClient.get<ApiResponse<Church>>(`/churches/${id}`),

  getDioceses: () => apiClient.get<ApiResponse<Diocese[]>>('/churches/meta/dioceses'),

  // The following are scoped by the X-Church-ID header set in the client.
  getMassTimings: (day?: number) =>
    apiClient.get<ApiResponse<MassTiming[]>>('/mass/timings', { params: { day } }),

  getLiveStream: () => apiClient.get<ApiResponse<LiveStream | null>>('/mass/live'),

  getRecordedMasses: () => apiClient.get<ApiResponse<LiveStream[]>>('/mass/recorded'),

  getAnnouncements: (page = 1) =>
    apiClient.get<ApiResponse<Announcement[]>>('/announcements', { params: { page } }),
};
