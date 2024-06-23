import { Avatar, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';

const AdminTableRow = ({element, handleOpenMenu}) => {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={element.first_name} src={`${process.env.REACT_APP_API_URL_IMAGE}${element.image}`} /> */}
            <Avatar alt={element.first_name} src={element.image.startsWith('blob') ? element.image : `${process.env.REACT_APP_API_URL_IMAGE}${element.image}`} />
            <Typography variant="subtitle2" noWrap>
              {element.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{element.email}</TableCell>

        <TableCell align="left">{element.rule}</TableCell>

        <TableCell align="right">
          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, element.id, element)}>
            <Iconify icon={'eva:more-vertical-fill'} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminTableRow;
