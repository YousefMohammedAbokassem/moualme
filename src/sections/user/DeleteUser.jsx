import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { headerApi } from 'src/utils/headerApi';

const DeleteUser = ({open, handleClose, id, setData}) => {
    const {token} = useSelector(state => state.auth)

    console.log(id)


    const [loading, setLoading] = useState(false)
    const handleDelete = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}admin/users/delete/${id}`, {
            headers: headerApi(token)
        })
        .then(res => {
            console.log(res)
            setLoading(false)
            setData(prev => prev.filter(el => el.id !== id))
            handleClose()
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you need to delete this user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <LoadingButton loading={loading} onClick={handleDelete} autoFocus>
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUser;
