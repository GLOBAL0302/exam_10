import {createSlice } from '@reduxjs/toolkit';
import { IApiNews} from '../../types.ts';
import { deleteNews, fetchNewsThunk } from './NewsThunk.ts';

export interface NewsSlice {
  news:IApiNews[]
  fetchingNews: boolean
  deletingNews: boolean
}

const initialState: NewsSlice = {
  news:[],
  fetchingNews: false,
  deletingNews:false
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

    builder.addCase(deleteNews.pending, state=>{
      state.deletingNews = true
    })
    builder.addCase(deleteNews.fulfilled, state=>{
      state.deletingNews = false
    })
    builder.addCase(deleteNews.rejected, state=>{
      state.deletingNews = false
    })
  },
  selectors:{
    selectAllNews: state=> state.news,
    selectFetchingNews:state=> state.fetchingNews
  }
})

export const newsReducer = newsSlice.reducer
export const {selectAllNews,selectFetchingNews} = newsSlice.selectors;
