import apiClient from './client';
import type { ApiResponse, MassTiming, Announcement, CertificateRequest, TransferRequest, Donation } from '../types';

export const adminApi = {
  getDashboard: () =>
    apiClient.get('/admin/dashboard'),

  // Mass
  addMassTiming: (data: Omit<MassTiming, '_id'>) =>
    apiClient.post<ApiResponse<MassTiming>>('/admin/mass-timings', data),

  updateMassTiming: (id: string, data: Partial<MassTiming>) =>
    apiClient.put<ApiResponse<MassTiming>>(`/admin/mass-timings/${id}`, data),

  deleteMassTiming: (id: string) =>
    apiClient.delete(`/admin/mass-timings/${id}`),

  // Families
  getFamilies: (page = 1, search?: string) =>
    apiClient.get('/admin/families', { params: { page, search } }),

  // Donations
  getDonations: (params?: { page?: number; type?: string; from?: string; to?: string }) =>
    apiClient.get<ApiResponse<Donation[]>>('/admin/donations', { params }),

  exportDonationsReport: (year: number) =>
    apiClient.get(`/admin/donations/report?year=${year}`, { responseType: 'blob' }),

  // Certificates
  getPendingCertificates: () =>
    apiClient.get<ApiResponse<CertificateRequest[]>>('/admin/certificates/pending'),

  approveCertificate: (id: string) =>
    apiClient.put(`/admin/certificates/${id}/approve`),

  rejectCertificate: (id: string, reason: string) =>
    apiClient.put(`/admin/certificates/${id}/reject`, { reason }),

  // Transfers
  getPendingTransfers: () =>
    apiClient.get<ApiResponse<TransferRequest[]>>('/admin/transfers/pending'),

  updateTransfer: (id: string, action: 'approve' | 'reject', notes?: string) =>
    apiClient.put(`/admin/transfers/${id}`, { action, notes }),

  // Announcements
  postAnnouncement: (data: Omit<Announcement, '_id' | 'publishedAt'>) =>
    apiClient.post<ApiResponse<Announcement>>('/admin/announcements', data),

  // Broadcast
  sendBroadcast: (title: string, body: string, audience: string) =>
    apiClient.post('/admin/notifications/broadcast', { title, body, audience }),
};
