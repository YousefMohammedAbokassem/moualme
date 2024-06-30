import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { headerApi } from 'src/utils/headerApi';

const AddCourses = ({ open, setOpen, setData, fetchCourses }) => {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [teachers, setTeachers] = useState([]);

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setErrorMessage('');
    setSuccessMessage('');
  };

  const dialogRef = useRef(null);

  const scrollToBottom = () => {
    dialogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [errorMessage]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      hours: '',
      lectures_count: '',
      chapters_count: '',
      price: '',
      teacher_id: '',
      has_test: '',
      has_certificate: '',
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      // formData.append('introduction_video', values.introduction_video);
      formData.append('hours', values.hours);
      formData.append('lectures_count', values.lectures_count);
      formData.append('chapters_count', values.chapters_count);
      formData.append('price', values.price);
      formData.append('teacher_id', values.teacher_id);
      formData.append('has_test', values.has_test);
      formData.append('has_certificate', values.has_certificate);
      formData.append('image', selectedFile);
      formData.append('introduction_video', selectedVideo);
      if (selectedFile) {
        setLoading(true);
        axios
          .post(`${process.env.REACT_APP_API_URL}admin/courses/create`, formData, {
            headers: headerApi(token),
          })
          .then((response) => {
            console.log(response, 'asdasdasdads');
            setSuccessMessage('Added success');
            setErrorMessage('');
            fetchCourses();

            // setLoading(false);
            // setOpen(false)
            // axios.post(`${process.env.REACT_APP_API_URL}`)

            //  console.log( {
            //   categoryId: selectedCategory,
            //   `coursesIds[${0}]`: res.data.course.id,
            // })

            const newFormData = new FormData();

            newFormData.append('categoryId', selectedCategory);
            newFormData.append(`coursesIds[0]`, response.data.course.id);
            axios
              .post(`${process.env.REACT_APP_API_URL}admin/addCoursesToCategory`, newFormData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log(res);
                setLoading(false);
                setOpen(false);
                setData((prev) => [...prev, response.data.course]);
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            setErrorMessage(error.response.data.error);
            setSuccessMessage('');
          });
      } else {
        setErrorMessage('Please select file');
        dialogRef.scrollTop = dialogRef.scrollHeight;
      }
    },
  });

  // handle image
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const videoInputRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/teachers`, {
        headers: headerApi(token),
      })
      .then((res) => {
        setTeachers(res.data.teachers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // handle selecte category

  const [category, setCategory] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/categories`, {
        headers: headerApi(token),
      })
      .then((res) => {
        console.log(res);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">{'Add Course'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ marginTop: '20px' }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  required
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hours"
                  name="hours"
                  required
                  value={formik.values.hours}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Lectures Count"
                  name="lectures_count"
                  required
                  value={formik.values.lectures_count}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Chapters Count"
                  name="chapters_count"
                  required
                  value={formik.values.chapters_count}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  required
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Teacher"
                  name="teacher_id"
                  required
                  value={formik.values.teacher_id}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {teachers.map((element, index) => (
                    <MenuItem key={index} value={element.id}>
                      {element.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Has Test"
                  name="has_test"
                  required
                  value={formik.values.has_test}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value="1">true</MenuItem>
                  <MenuItem value="0">false</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Has Certificate"
                  name="has_certificate"
                  required
                  value={formik.values.has_certificate}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value="1">true</MenuItem>
                  <MenuItem value="0">false</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Selecte Category"
                  name="selecte category"
                  required
                  value={formik.values.selectedCategory}
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
              <Grid item xs={12} md={6} sx={{ position: 'relative', display: 'flex', alignItems: 'content' }}>
                <label htmlFor="file" style={{ margin: '0 10px 0 0' }}>
                  <Button variant="contained" onClick={() => fileInputRef.current.click()}>
                    Image
                  </Button>
                </label>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <label htmlFor="file">
                  <Button variant="contained" onClick={() => videoInputRef.current.click()}>
                    Video
                  </Button>
                </label>
                <input
                  id="file"
                  type="file"
                  accept="video/*"
                  style={{ display: 'none' }}
                  ref={videoInputRef}
                  onChange={(e) => setSelectedVideo(e.target.files[0])}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <LoadingButton type="submit" loading={loading} autoFocus>
              Agree
            </LoadingButton>
          </DialogActions>
        </form>
        {errorMessage && (
          <Typography ref={dialogRef} variant="h6" sx={{ color: 'red', textAlign: 'center', padding: '10px 20px' }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="h6" sx={{ color: 'green', textAlign: 'center', padding: '10px 20px' }}>
            {successMessage}
          </Typography>
        )}
      </Dialog>
    </>
  );
};

export default AddCourses;
