import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  notificationCount: number;
  isOnline: boolean;
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
}

const initialState: UIState = {
  notificationCount: 0,
  isOnline: true,
  toastMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload;
    },
    incrementNotifications: state => {
      state.notificationCount += 1;
    },
    clearNotifications: state => {
      state.notificationCount = 0;
    },
    setOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    showToast: (
      state,
      action: PayloadAction<{ text: string; type: 'success' | 'error' | 'info' }>,
    ) => {
      state.toastMessage = action.payload;
    },
    hideToast: state => {
      state.toastMessage = null;
    },
  },
});

export const {
  setNotificationCount,
  incrementNotifications,
  clearNotifications,
  setOnline,
  showToast,
  hideToast,
} = uiSlice.actions;

export const selectNotificationCount = (state: { ui: UIState }) =>
  state.ui.notificationCount;
export const selectIsOnline = (state: { ui: UIState }) => state.ui.isOnline;
export const selectToast = (state: { ui: UIState }) => state.ui.toastMessage;

export default uiSlice.reducer;
