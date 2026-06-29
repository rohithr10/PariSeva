import apiClient from './client';
import type { ApiResponse, CommunityGroup, Event, JobPosting, MediaItem, ClubType } from '../types';

export const communityApi = {
  getGroups: (type?: ClubType) =>
    apiClient.get<ApiResponse<CommunityGroup[]>>('/community/groups', { params: { type } }),

  getEvents: (params?: { groupId?: string; status?: string }) =>
    apiClient.get<ApiResponse<Event[]>>('/community/events', { params }),

  rsvpEvent: (eventId: string) =>
    apiClient.post<ApiResponse<{ hasRsvped: boolean; rsvpCount: number }>>(
      `/community/events/${eventId}/rsvp`,
    ),

  // Jobs are a top-level resource on the backend
  getJobs: (category?: 'in_church' | 'around_church' | 'referral') =>
    apiClient.get<ApiResponse<JobPosting[]>>('/jobs', { params: { category } }),

  postJob: (job: Omit<JobPosting, '_id' | 'createdAt'>) =>
    apiClient.post<ApiResponse<JobPosting>>('/jobs', job),

  getGallery: (params?: { type?: 'photo' | 'video'; year?: number }) =>
    apiClient.get<ApiResponse<MediaItem[]>>('/gallery', { params }),
};
