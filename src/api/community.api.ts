import apiClient from './client';
import type { ApiResponse, CommunityGroup, Event, JobPosting, MediaItem } from '../types';

export const communityApi = {
  getGroups: () =>
    apiClient.get<ApiResponse<CommunityGroup[]>>('/community/groups'),

  getEvents: (groupId?: string) =>
    apiClient.get<ApiResponse<Event[]>>('/community/events', { params: { groupId } }),

  rsvpEvent: (eventId: string) =>
    apiClient.post(`/community/events/${eventId}/rsvp`),

  getJobs: (category?: 'in_church' | 'around_church' | 'referral') =>
    apiClient.get<ApiResponse<JobPosting[]>>('/community/jobs', { params: { category } }),

  postJob: (job: Omit<JobPosting, '_id' | 'createdAt'>) =>
    apiClient.post<ApiResponse<JobPosting>>('/community/jobs', job),

  getGallery: (year?: number, month?: number) =>
    apiClient.get<ApiResponse<MediaItem[]>>('/gallery', { params: { year, month } }),
};
