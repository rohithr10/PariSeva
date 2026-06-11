import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DailyReading, Bookmark, BibleBook } from '../../types';

interface BibleState {
  dailyReading: DailyReading | null;
  books: BibleBook[];
  bookmarks: Bookmark[];
  currentBook: string | null;
  currentChapter: number;
  currentVerse: number | null;
  language: 'en' | 'ta';
  fontSize: number;
  nightMode: boolean;
  loading: boolean;
}

const initialState: BibleState = {
  dailyReading: null,
  books: [],
  bookmarks: [],
  currentBook: null,
  currentChapter: 1,
  currentVerse: null,
  language: 'en',
  fontSize: 17,
  nightMode: false,
  loading: false,
};

const bibleSlice = createSlice({
  name: 'bible',
  initialState,
  reducers: {
    setDailyReading: (state, action: PayloadAction<DailyReading>) => {
      state.dailyReading = action.payload;
    },
    setBooks: (state, action: PayloadAction<BibleBook[]>) => {
      state.books = action.payload;
    },
    setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
      state.bookmarks = action.payload;
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks = [action.payload, ...state.bookmarks];
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(b => b._id !== action.payload);
    },
    setCurrentPosition: (
      state,
      action: PayloadAction<{ book: string; chapter: number; verse?: number }>,
    ) => {
      state.currentBook = action.payload.book;
      state.currentChapter = action.payload.chapter;
      state.currentVerse = action.payload.verse ?? null;
    },
    setBibleLanguage: (state, action: PayloadAction<'en' | 'ta'>) => {
      state.language = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = Math.min(24, Math.max(13, action.payload));
    },
    toggleNightMode: state => {
      state.nightMode = !state.nightMode;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setDailyReading,
  setBooks,
  setBookmarks,
  addBookmark,
  removeBookmark,
  setCurrentPosition,
  setBibleLanguage,
  setFontSize,
  toggleNightMode,
  setLoading,
} = bibleSlice.actions;

export const selectDailyReading = (state: { bible: BibleState }) =>
  state.bible.dailyReading;
export const selectBibleBooks = (state: { bible: BibleState }) => state.bible.books;
export const selectBookmarks = (state: { bible: BibleState }) => state.bible.bookmarks;
export const selectBibleLanguage = (state: { bible: BibleState }) => state.bible.language;
export const selectFontSize = (state: { bible: BibleState }) => state.bible.fontSize;
export const selectNightMode = (state: { bible: BibleState }) => state.bible.nightMode;

export default bibleSlice.reducer;
