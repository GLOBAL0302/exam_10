import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { INews } from '../../types.ts';

export const getOneNews = createAsyncThunk<INews, string>('getOneNews', async (id) => {
  const { data } = await axiosApi.get(`/news/${id}`);
  return data;
});
