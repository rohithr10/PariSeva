import apiClient from './client';
import type { ApiResponse, Family, FamilyMember, CertificateRequest, CertType } from '../types';

export const familyApi = {
  getMyCard: () =>
    apiClient.get<ApiResponse<Family>>('/family/card'),

  updateCard: (data: Partial<Family>) =>
    apiClient.put<ApiResponse<Family>>('/family/card', data),

  getMembers: () =>
    apiClient.get<ApiResponse<FamilyMember[]>>('/family/members'),

  addMember: (member: Omit<FamilyMember, '_id' | 'familyId'>) =>
    apiClient.post<ApiResponse<FamilyMember>>('/family/members', member),

  updateMember: (memberId: string, data: Partial<FamilyMember>) =>
    apiClient.put<ApiResponse<FamilyMember>>(`/family/members/${memberId}`, data),

  getCertificates: () =>
    apiClient.get<ApiResponse<CertificateRequest[]>>('/certificates'),

  requestCertificate: (payload: { memberId: string; type: CertType; purpose: string; additionalInfo?: object }) =>
    apiClient.post<ApiResponse<CertificateRequest>>('/certificates/request', payload),

  downloadCertificate: (certId: string) =>
    apiClient.get(`/certificates/${certId}/download`, { responseType: 'blob' }),

  requestTransfer: (payload: { destinationChurchId: string; reason: string }) =>
    apiClient.post('/family/transfer', payload),
};
