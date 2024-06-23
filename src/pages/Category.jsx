import { Button, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import SkeletonCopm from 'src/components/skeleton-comp';
import AddCategory from 'src/sections/category/AddCategory';
import CategoryCourse from 'src/sections/category/CategoryCourse';
import DeleteCategory from 'src/sections/category/DeleteCategory';
import UpdateCategory from 'src/sections/category/UpdateCategory';
import { headerApi } from 'src/utils/headerApi';

const Category = () => {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);
  const [category, setCategory] = useState([]);

  const handleClose = () => {
    setOpenAdd(false);
  };

  //handle update
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const [selectedId, setSelectedId] = useState('');
  const [selectedElement, setSelectedElement] = useState({});

  const handleUpdate = (event, id, element) => {
    setOpenUpdate(true);
    setSelectedElement(element);
    setSelectedId(id);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/categories`, {
        headers: headerApi(token),
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //handle delete
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [selectedDelete, setSelectedDelete] = useState('');
  console.log(selectedDelete);

  const handleDelete = (element) => {
    setSelectedDelete(element.id);
    setOpenDelete(true);
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button onClick={() => setOpenAdd(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Category
          </Button>
        </Stack>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {loading ? (
            <SkeletonCopm />
          ) : (
            category.map((element, index) => (
              <CategoryCourse key={index} element={element} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            ))
          )}
        </div>
      </Container>
      <AddCategory open={openAdd} handleClose={handleClose} setData={setCategory} />
      <UpdateCategory
        selectedId={selectedId}
        element={selectedElement}
        setData={setCategory}
        open={openUpdate}
        handleClose={handleCloseUpdate}
      />
      <DeleteCategory open={openDelete} handleClose={handleCloseDelete} id={selectedDelete} setData={setCategory} />
    </>
  );
};

export default Category;
