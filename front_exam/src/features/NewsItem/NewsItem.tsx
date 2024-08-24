import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import dayjs from 'dayjs';

import { getOneNews } from './NewsItemThunk.ts';
import { selectNewsItem } from './NewsItemSlice.ts';
import { Typography } from '@mui/material';

const NewsItem = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const selectOneNews = useAppSelector(selectNewsItem);
  console.log(selectOneNews);

  useEffect(() => {
    if (id) {
      dispatch(getOneNews(id));
    }
  }, [dispatch]);

  return (
    selectOneNews && (
      <>
        <div>
          <Typography variant="h3" component="h3">
            {selectOneNews.title}
          </Typography>
          <Typography variant="body2" component="p">
            {dayjs(selectOneNews.create_at).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>
          <Typography variant="h5" component="h5">
            {selectOneNews.description}
          </Typography>
        </div>
      </>
    )
  );
};

export default NewsItem;
