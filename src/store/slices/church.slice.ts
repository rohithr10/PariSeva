import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Church, MassTiming, LiveStream, Announcement } from '../../types';

interface ChurchState {
  churches: Church[];
  selectedChurch: Church | null;
  massTimings: MassTiming[];
  liveStream: LiveStream | null;
  announcements: Announcement[];
  loading: boolean;
}

const initialState: ChurchState = {
  churches: [],
  selectedChurch: null,
  massTimings: [],
  liveStream: null,
  announcements: [],
  loading: false,
};

const churchSlice = createSlice({
  name: 'church',
  initialState,
  reducers: {
    setChurches: (state, action: PayloadAction<Church[]>) => {
      state.churches = action.payload;
    },
    setSelectedChurch: (state, action: PayloadAction<Church>) => {
      state.selectedChurch = action.payload;
    },
    setMassTimings: (state, action: PayloadAction<MassTiming[]>) => {
      state.massTimings = action.payload;
    },
    setLiveStream: (state, action: PayloadAction<LiveStream | null>) => {
      state.liveStream = action.payload;
    },
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => {
      state.announcements = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setChurches,
  setSelectedChurch,
  setMassTimings,
  setLiveStream,
  setAnnouncements,
  setLoading,
} = churchSlice.actions;

export const selectChurches = (state: { church: ChurchState }) => state.church.churches;
export const selectMassTimings = (state: { church: ChurchState }) =>
  state.church.massTimings;
export const selectLiveStream = (state: { church: ChurchState }) =>
  state.church.liveStream;
export const selectAnnouncements = (state: { church: ChurchState }) =>
  state.church.announcements;

export default churchSlice.reducer;
