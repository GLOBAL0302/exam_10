import { INews } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';

export interface NewsItemSlice {
  newsItem: INews | null
  newsItemLoading: boolean
}

const initialState:NewsItemSlice = {
  newsItem: null,
  newsItemLoading: false,
}

const newsItemSlice = createSlice({
  name: 'newsItem',
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{

  },
  selectors:{

  }
})