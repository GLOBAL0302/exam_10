import { INews } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { getOneNews } from './NewsItemThunk.ts';

export interface NewsItemSlice {
  newsItem: INews | null;
  newsItemLoading: boolean;
}

const initialState: NewsItemSlice = {
  newsItem: null,
  newsItemLoading: false,
};

const newsItemSlice = createSlice({
  name: 'newsItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneNews.pending, (state) => {
        state.newsItemLoading = true;
      })
      .addCase(getOneNews.fulfilled, (state, { payload }) => {
        state.newsItemLoading = false;
        state.newsItem = payload;
      })
      .addCase(getOneNews.rejected, (state) => {
        state.newsItemLoading = false;
      });
  },
  selectors: {
    selectNewsItem: (state) => state.newsItem,
  },
});

export const newsItemReducer = newsItemSlice.reducer;
export const { selectNewsItem } = newsItemSlice.selectors;
