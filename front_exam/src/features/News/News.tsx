import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {useEffect } from 'react';
import { fetchNewsThunk } from './NewsThunk.ts';
import { selectAllNews, selectFetchingNews } from './NewsSlice.ts';
import NewsItem from './NewsItem.tsx';


const News = () => {
  const dispatch = useAppDispatch()
  const selectNews = useAppSelector(selectAllNews);
  const selectFetchNews = useAppSelector(selectFetchingNews);


  useEffect(() => {
    dispatch(fetchNewsThunk())
  }, [dispatch, selectNews]);

  return (
    <>
      {selectNews.map(item=>(<NewsItem key={item.id} item={item}/>))}
    </>
  );
};

export default News;