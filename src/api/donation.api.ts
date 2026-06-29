import apiClient from './client';
import type { ApiResponse, Donation, DonationSummary, OfferingType } from '../types';

export interface CreateOrderPayload {
  amount: number;
  type: OfferingType;
  intention?: string;
  isAnonymous?: boolean;
}

export interface CreatedOrder {
  donationId: string;
  order: {
    id: string;
    amount: number; // paise
    currency: string;
    receipt: string;
    status: string;
    keyId: string;
  };
}

export interface VerifyPaymentPayload {
  donationId: string;
  orderId: string;
  paymentId: string;
  signature: string;
}

export const donationApi = {
  createOrder: (payload: CreateOrderPayload) =>
    apiClient.post<ApiResponse<CreatedOrder>>('/donations/order', payload),

  verifyPayment: (payload: VerifyPaymentPayload) =>
    apiClient.post<ApiResponse<Donation>>('/donations/verify', payload),

  getHistory: (page = 1, limit = 20) =>
    apiClient.get<ApiResponse<Donation[]>>('/donations/me', { params: { page, limit } }),

  getSummary: (year: number) =>
    apiClient.get<ApiResponse<DonationSummary>>('/donations/summary', { params: { year } }),

  getReceipt: (donationId: string) =>
    apiClient.get<ApiResponse<{ receiptNumber: string; amount: number; currency: string; type: OfferingType; date: string; receiptUrl?: string }>>(
      `/donations/${donationId}/receipt`,
    ),
};
