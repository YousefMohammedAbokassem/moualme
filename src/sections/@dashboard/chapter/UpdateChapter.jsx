import { LoadingButton } from '@mui/lab';
import { Button,Typography, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { headerApi } from 'src/utils/headerApi';

const UpdateChapter = ({open, setData, setOpen, chapterId, element, handleCloseMenu}) => {
  const {id} = useParams()
    const {token} = useSelector(state => state.auth)

    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")




    const formik = useFormik({
        initialValues: {
          name: '',
          order: '',
          lectures_count: '',
          is_free: '',
        },
        onSubmit: (values) => {
          setLoading(true);
          const formData = new FormData()
          formData.append("name", values.name)
          formData.append("order", values.order)
          formData.append("lectures_count", values.lectures_count)
          formData.append("is_free", values.is_free)
          formData.append("id", chapterId)
          formData.append("course_id", id)
          axios
            .post(`${process.env.REACT_APP_API_URL}admin/courses/chapters/update`, formData, {
              headers: headerApi(token)
            })
            .then((res) => {
              setSuccessMessage('Update success');
              setErrorMessage('');
              setLoading(false);
              handleCloseMenu()
              setOpen(false)
              setData((prev) =>
              prev.map((admin) =>
                admin.id === chapterId
                  ? {
                      ...admin,
                      name: values.name,
                      order: values.order,
                      lectures_count: values.lectures_count,
                      is_free: values.is_free,
                    }
                  : admin
              )
            );
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              setErrorMessage(error.response.data.error);
              setSuccessMessage('');
            });
        },
      });

      useEffect(() => {
        if (element) {
          formik.setValues({
            name: element.name || '',
            order: element.order || '',
            lectures_count: element.lectures_count || '',
            is_free: element.is_free || '',
          });
        }
    
      }, [element, formik.setValues]);


  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">{'Add Teacher'}</DialogTitle>
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
                  label="Order"
                  name="order"
                  required
                  value={formik.values.order}
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
                  id="outlined-select-currency"
                  select
                  label="Select Is Free"
                  name="is_free"
                  required
                  value={formik.values.is_free}
                  onChange={formik.handleChange}
                  fullWidth
                >
                    <MenuItem value="1">
                      True
                    </MenuItem>
                    <MenuItem value="0">
                      False
                    </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Disagree</Button>
            <LoadingButton type="submit" loading={loading} autoFocus>
              Agree
            </LoadingButton>
          </DialogActions>
        </form>
        {errorMessage && (
          <Typography variant="h6" sx={{ color: 'red', textAlign: 'center', padding: '10px 20px' }}>
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

export default UpdateChapter;
