import { LoadingButton } from '@mui/lab';
import { Button,Typography, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { headerApi } from 'src/utils/headerApi';

const AddCategory = ({open, handleClose, setData}) => {
    const {token} = useSelector(state => state.auth)
    const {id} = useParams()

    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);




    const formik = useFormik({
        initialValues: {
          name: '',
        },
        onSubmit: (values) => {
          setLoading(true);
          const formData = new FormData()
          formData.append("name", values.name)
          formData.append("image", selectedFile)

          for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

          setSuccessMessage("")
          setErrorMessage("")


          axios
            .post(`${process.env.REACT_APP_API_URL}admin/categories`, formData, {
              headers: headerApi(token)
            })
            .then((res) => {
              setErrorMessage('');
              formik.resetForm()
              handleClose()
              setLoading(false);
              setData((prev) => [...prev, res.data])();
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              setErrorMessage(error.response.data.error);
              setSuccessMessage('');
            });
        },
      });


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">{'Add Category'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ marginTop: '20px' }}>
              <Grid item xs={12} md={12} sx={{width: "400px"}}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                <label htmlFor="file">
                  <Button variant="contained" onClick={() => fileInputRef.current.click()}>
                    Image
                  </Button>
                </label>
                <input
                  id="file"
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
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

export default AddCategory;
