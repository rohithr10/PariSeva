import apiClient from './client';
import type {
  ApiResponse,
  MassTiming,
  Announcement,
  CertificateRequest,
  TransferRequest,
} from '../types';

/**
 * Admin actions are role-guarded on the resource routes themselves
 * (not a separate /admin namespace). The backend authorises staff roles
 * via the JWT, so these hit the same endpoints with admin privileges.
 */
export const adminApi = {
  // ── Mass timings ──
  addMassTiming: (data: Partial<MassTiming>) =>
    apiClient.post<ApiResponse<MassTiming>>('/mass/timings', data),

  updateMassTiming: (id: string, data: Partial<MassTiming>) =>
    apiClient.patch<ApiResponse<MassTiming>>(`/mass/timings/${id}`, data),

  deleteMassTiming: (id: string) => apiClient.delete(`/mass/timings/${id}`),

  // ── Certificates queue ──
  getPendingCertificates: (status = 'pending') =>
    apiClient.get<ApiResponse<CertificateRequest[]>>('/certificates', { params: { status } }),

  updateCertificate: (
    id: string,
    payload: {
      status: 'under_review' | 'approved' | 'rejected' | 'ready';
      certificateUrl?: string;
      certificateNumber?: string;
      rejectionReason?: string;
    },
  ) => apiClient.patch<ApiResponse<CertificateRequest>>(`/certificates/${id}/status`, payload),

  // ── Transfers queue ──
  getTransfers: () => apiClient.get<ApiResponse<TransferRequest[]>>('/transfers'),

  updateTransfer: (
    id: string,
    payload: {
      status: 'approved_source' | 'pending_destination' | 'completed' | 'rejected';
      rejectionReason?: string;
    },
  ) => apiClient.patch(`/transfers/${id}/status`, payload),

  // ── Announcements ──
  postAnnouncement: (data: Omit<Announcement, '_id' | 'publishedAt'>) =>
    apiClient.post<ApiResponse<Announcement>>('/announcements', data),

  deleteAnnouncement: (id: string) => apiClient.delete(`/announcements/${id}`),
};
