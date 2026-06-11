import apiClient from './client';
import type { ApiResponse, User } from '../types';

export interface LoginPayload { phone: string; password: string }
export interface OTPPayload { phone: string; otp: string }
export interface RegisterPayload {
  phone: string;
  password: string;
  familyName: string;
  firstName: string;
  lastName: string;
  email?: string;
  churchId: string;
  address: { street: string; city: string; pincode: string };
}

export const authApi = {
  sendOTP: (phone: string) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/send-otp', { phone }),

  verifyOTP: (payload: OTPPayload) =>
    apiClient.post<ApiResponse<{ token: string; refreshToken: string; user: User }>>(
      '/auth/verify-otp', payload,
    ),

  login: (payload: LoginPayload) =>
    apiClient.post<ApiResponse<{ token: string; refreshToken: string; user: User }>>(
      '/auth/login', payload,
    ),

  register: (payload: RegisterPayload) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/register', payload),

  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh-token', { refreshToken }),

  logout: () => apiClient.post('/auth/logout'),

  forgotPassword: (phone: string) =>
    apiClient.post('/auth/forgot-password', { phone }),

  resetPassword: (payload: { phone: string; otp: string; newPassword: string }) =>
    apiClient.post('/auth/reset-password', payload),
};
