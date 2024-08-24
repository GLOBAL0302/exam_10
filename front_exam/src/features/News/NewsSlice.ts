import {createSlice } from '@reduxjs/toolkit';
import { IApiNews} from '../../types.ts';
import { fetchNewsThunk } from './NewsThunk.ts';

export interface NewsSlice {
  news:IApiNews[]
  fetchingNews: boolean
}

const initialState: NewsSlice = {
  news:[],
  fetchingNews: false,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchNewsThunk.pending, state => {
        state.fetchingNews = true
      })
      .addCase(fetchNewsThunk.fulfilled, (state,{payload}, )=>{
        state.news = payload;
        state.fetchingNews = false
      })
      .addCase(fetchNewsThunk.rejected, state => {
        state.fetchingNews = false
      })
  },
  selectors:{
    selectAllNews: state=> state.news,
    selectFetchingNews:state=> state.fetchingNews
  }
})

export const newsReducer = newsSlice.reducer
export const {selectAllNews,selectFetchingNews} = newsSlice.selectors;
