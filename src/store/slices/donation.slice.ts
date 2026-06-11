import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Donation, DonationSummary, OfferingType } from '../../types';

interface DonationState {
  history: Donation[];
  summary: DonationSummary | null;
  pendingOffering: {
    type: OfferingType | null;
    amount: number;
    intention: string;
    isAnonymous: boolean;
  };
  loading: boolean;
}

const initialState: DonationState = {
  history: [],
  summary: null,
  pendingOffering: {
    type: null,
    amount: 0,
    intention: '',
    isAnonymous: false,
  },
  loading: false,
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<Donation[]>) => {
      state.history = action.payload;
    },
    appendHistory: (state, action: PayloadAction<Donation[]>) => {
      state.history = [...state.history, ...action.payload];
    },
    addDonation: (state, action: PayloadAction<Donation>) => {
      state.history = [action.payload, ...state.history];
    },
    setSummary: (state, action: PayloadAction<DonationSummary>) => {
      state.summary = action.payload;
    },
    setPendingOffering: (
      state,
      action: PayloadAction<Partial<DonationState['pendingOffering']>>,
    ) => {
      state.pendingOffering = { ...state.pendingOffering, ...action.payload };
    },
    clearPendingOffering: state => {
      state.pendingOffering = { type: null, amount: 0, intention: '', isAnonymous: false };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setHistory,
  appendHistory,
  addDonation,
  setSummary,
  setPendingOffering,
  clearPendingOffering,
  setLoading,
} = donationSlice.actions;

export const selectDonationHistory = (state: { donation: DonationState }) =>
  state.donation.history;
export const selectDonationSummary = (state: { donation: DonationState }) =>
  state.donation.summary;
export const selectPendingOffering = (state: { donation: DonationState }) =>
  state.donation.pendingOffering;

export default donationSlice.reducer;
