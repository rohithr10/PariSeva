import apiClient from './client';
import type { ApiResponse, Donation, DonationSummary, OfferingType } from '../types';

export interface CreateOrderPayload {
  amount: number;
  type: OfferingType;
  intention?: string;
  isAnonymous?: boolean;
}

export interface VerifyPaymentPayload {
  orderId: string;
  paymentId: string;
  signature: string;
}

export const donationApi = {
  createOrder: (payload: CreateOrderPayload) =>
    apiClient.post<ApiResponse<{ orderId: string; amount: number; currency: string; key: string }>>(
      '/donations/order', payload,
    ),

  verifyPayment: (payload: VerifyPaymentPayload) =>
    apiClient.post<ApiResponse<Donation>>('/donations/verify', payload),

  getHistory: (page = 1, limit = 20) =>
    apiClient.get<ApiResponse<Donation[]>>('/donations/history', { params: { page, limit } }),

  getSummary: (year: number) =>
    apiClient.get<ApiResponse<DonationSummary>>('/donations/summary', { params: { year } }),

  getReceipt: (donationId: string) =>
    apiClient.get(`/donations/${donationId}/receipt`, { responseType: 'blob' }),

  createSubscription: (plan: 'monthly' | 'yearly') =>
    apiClient.post('/subscriptions', { plan }),
};
