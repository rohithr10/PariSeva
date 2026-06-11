import apiClient from './client';
import type { ApiResponse, Church, MassTiming, LiveStream, Announcement } from '../types';

export const churchApi = {
  search: (query: string, diocese?: string) =>
    apiClient.get<ApiResponse<Church[]>>('/churches', { params: { q: query, diocese } }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Church>>(`/churches/${id}`),

  getMassTimings: (churchId: string) =>
    apiClient.get<ApiResponse<MassTiming[]>>(`/churches/${churchId}/mass-timings`),

  getLiveStream: (churchId: string) =>
    apiClient.get<ApiResponse<LiveStream | null>>(`/churches/${churchId}/live-stream`),

  getAnnouncements: (churchId: string, page = 1) =>
    apiClient.get<ApiResponse<Announcement[]>>(
      `/churches/${churchId}/announcements`,
      { params: { page } },
    ),
};
