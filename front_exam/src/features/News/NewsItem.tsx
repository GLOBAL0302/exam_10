import { IApiNews } from '../../types.ts';
import { Box, Grid, Typography } from '@mui/material';

interface Props {
  item: IApiNews
}

const NewsItem:React.FC<Props> = ({item}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src="" alt="" />
        </Grid>
        <Grid>
          <Typography>
            {item.title}
          </Typography>
          <Typography>
            {item.create_at}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsItem;