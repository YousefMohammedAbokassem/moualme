import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { headerApi } from 'src/utils/headerApi';

const AddCoursToCategory = ({ open, handleClose, selectedAddCourses, category }) => {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDelete = () => {
    setLoading(true);
    const newFormData = new FormData()

    newFormData.append("categoryId", selectedCategory)
    newFormData.append(`coursesIds[0]`, selectedAddCourses)
    axios
      .post(`${process.env.REACT_APP_API_URL}admin/addCoursesToCategory`, newFormData, {
        headers: headerApi(token),
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        // setOpen(false);
        handleClose()
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Select category you need add this course to it'}</DialogTitle>
        <DialogContent>
          <Grid container sx={{ marginBottom: '40px', width: '400px', marginTop: '40px' }}>
            <Grid item xs={12} md={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select category"
                name="teacher_id"
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
              >
                {category.map((element, index) => (
                  <MenuItem key={index} value={element.id}>
                    {element.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            {loading ? <CircularProgress /> : 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCoursToCategory;
