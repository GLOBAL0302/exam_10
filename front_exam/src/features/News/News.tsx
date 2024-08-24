import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchNewsThunk } from './NewsThunk.ts';
import { selectAllNews, selectFetchingNews } from './NewsSlice.ts';


const News = () => {
  const dispatch = useAppDispatch()
  const selectNews = useAppSelector(selectAllNews);
  const selectFetchNews = useAppSelector(selectFetchingNews);


  useEffect(() => {
    dispatch(fetchNewsThunk())
  }, [dispatch]);

  return (
    <>
      {selectNews.map(item=>(<News key={item.id} item={item}/>))}
    </>
  );
};

export default News;