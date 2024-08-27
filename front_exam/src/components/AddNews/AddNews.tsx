import { useState } from 'react';
import { newsMutation } from '../../types';
import FileInput from '../../UI/FileInput';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import {addNews, fetchNewsThunk} from '../../features/News/NewsThunk.ts';

interface Props {
  onClose: () => void;
}

const initialState: newsMutation = {
  title: '',
  description: '',
  image: '',
};

const AddNews: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [newsMutation, setNewsMutation] = useState(initialState);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewsMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setNewsMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(addNews(newsMutation));
    await dispatch(fetchNewsThunk());
  };

  return (
    <Grid container padding={4} spacing={2} component="form" onSubmit={onClickSubmit}>
      <Grid width="100%" item>
        <TextField
          fullWidth
          value={newsMutation.title}
          onChange={inputChangeHandler}
          name="title"
          id="Title"
          label="Title"
          variant="outlined"
        />
      </Grid>
      <Grid width="100%" item>
        <TextField
          fullWidth
          value={newsMutation.description}
          onChange={inputChangeHandler}
          name="description"
          id="Description"
          label="Description"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <FileInput onChange={fileInputChangeHandler} name={'image'} />
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" color="primary" onClick={onClose}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddNews;
