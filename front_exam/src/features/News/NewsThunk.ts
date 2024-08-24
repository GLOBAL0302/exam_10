import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApiNews, newsMutation } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';




export const fetchNewsThunk = createAsyncThunk<IApiNews[]>(
  "fetchNewsThunk",
  async()=>{
    let {data} = await axiosApi.get("/news");
    return data
  }
)


export const addNews = createAsyncThunk<void, newsMutation>(
  "addNews",
  async(item)=>{
    console.log(item);
    const formData= new FormData();
    formData.append("title", item.title);
    formData.append("description", item.description);
    if(item.image){
      formData.append("image", item.image);
    }
    await axiosApi.post("/news", formData)
  }
)