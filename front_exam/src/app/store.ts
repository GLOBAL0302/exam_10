import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '../features/News/NewsSlice.ts';
import { newsItemReducer } from '../features/NewsItem/NewsItemSlice.ts';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    newsItem: newsItemReducer,
  },
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;
