import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddNews from '../components/AddNews/AddNews.tsx';


const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
    <Grid container spacing={2} display="flex" alignItems="center" justifyContent="center">
      <Grid item component="div">
        <Typography variant="h6" component="h6">POSTS</Typography>
      </Grid>
      <Grid item sx={{marginLeft:"auto"}}>
        <Button
          onClick={handleClickOpen}
          variant="contained" >Add news</Button>
      </Grid>
    </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add news"}
        </DialogTitle>
        <DialogContent>
          <AddNews onClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;