import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { deleteNews, fetchNewsThunk } from './NewsThunk.ts';
import { selectAllNews, selectFetchingNews } from './NewsSlice.ts';
import dayjs from 'dayjs';
import { Box, Button, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {API_URL} from '../../constants.ts';

const News = () => {
  const dispatch = useAppDispatch();
  const selectNews = useAppSelector(selectAllNews);
  const selectFetchNews = useAppSelector(selectFetchingNews);

  useEffect(() => {
    dispatch(fetchNewsThunk());
  }, [dispatch]);

  const deleteOneNews =  async (id:number)=>{
     await dispatch(deleteNews(id));
     await dispatch(fetchNewsThunk());
  };

  let cardImage = "data:image/png;base64,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"

  return (
    <>
      {selectNews.map((item) => (
        <Box key={item.id} marginBottom={2} border={2} padding={1}>
          <Grid container spacing={2} display="flex" alignItems="center">
            <Grid item>
              <img
                width={'60px'}
                height={'60px'}
                src={item.image ? `${API_URL}/${item.image}` : cardImage}
                alt=""
              />
            </Grid>
            <Grid item width="80%">
              <Typography>{item.title}</Typography>
              <Typography variant="body2" component="p">
                {dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
              <Button
                sx={{ marginRight: 2 }}
                onClick={() => deleteOneNews(item.id)}
                variant="contained"
                color={'error'}
              >
                Delete
              </Button>
              <Button variant="outlined">
                <NavLink to={`/news/${item.id}`}>Read Full &gt;&gt;&gt;</NavLink>
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default News;
