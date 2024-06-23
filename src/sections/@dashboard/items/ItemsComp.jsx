import {
  Card,
  CircularProgress,
  Container,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import Scrollbar from 'src/components/scrollbar';
import ItemsTableRow from './ItemsTableRow';
import Iconify from 'src/components/iconify';
import USERLIST from '../../../_mock/user';
import SkeletonTable from 'src/components/SkeletonTabel';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { headerApi } from 'src/utils/headerApi';

const ItemsComp = ({ loadingCity, city, setCity, setSelectedElement, setSelectedId, selectedId, setOpenUpdate, setAnchorEl, anchorEl }) => {
  const { token } = useSelector((state) => state.auth);

  //handle pagination
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event, id, element) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    setSelectedElement(element);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //handle delete

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = () => {
    setDeleteLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/cities/delete/${selectedId}`, {
        headers: headerApi(token),
      })
      .then((res) => {
        setDeleteLoading(false);
        console.log(res);
        setCity((prev) => prev.filter((el) => el.id !== selectedId));
        setAnchorEl(null);
      })
      .catch((error) => {
        console.log(error);
        setDeleteLoading(false);
      });
  };


  return (
    <>
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>city</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingCity ? (
                    <SkeletonTable number={4} />
                  ) : (
                    city.map((element, index) => (
                      <ItemsTableRow key={index} element={element} handleOpenMenu={handleOpenMenu} />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={city.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => setOpenUpdate(true)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Update City
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          {deleteLoading ? <CircularProgress size={20} /> : 'Delete'}
        </MenuItem>
      </Popover>
    </>
  );
};

export default ItemsComp;
