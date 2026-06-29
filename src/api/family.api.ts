import apiClient from './client';
import type { ApiResponse, Family, FamilyMember, CertificateRequest, CertType } from '../types';

export const familyApi = {
  getMyCard: () => apiClient.get<ApiResponse<Family>>('/families/me'),

  addMember: (member: Omit<FamilyMember, '_id' | 'familyId' | 'sacraments'>) =>
    apiClient.post<ApiResponse<Family>>('/families/me/members', member),

  updateMember: (memberId: string, data: Partial<FamilyMember>) =>
    apiClient.patch<ApiResponse<Family>>(`/families/me/members/${memberId}`, data),

  removeMember: (memberId: string) =>
    apiClient.delete<ApiResponse<Family>>(`/families/me/members/${memberId}`),

  // Certificates
  getCertificates: () =>
    apiClient.get<ApiResponse<CertificateRequest[]>>('/certificates/me'),

  requestCertificate: (payload: {
    memberId?: string;
    memberName: string;
    type: CertType;
    purpose: string;
    familyId?: string;
  }) => apiClient.post<ApiResponse<CertificateRequest>>('/certificates', payload),

  // Church transfer
  requestTransfer: (payload: { destinationChurchId: string; reason?: string }) =>
    apiClient.post('/transfers', payload),

  getMyTransfers: () => apiClient.get('/transfers/me'),
};
