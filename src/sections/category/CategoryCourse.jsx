import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react';

const CategoryCourse = ({ element, handleUpdate, handleDelete }) => {

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${process.env.REACT_APP_API_URL_IMAGE}/${element.image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {element.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row">
          <Button size="small" onClick={(event) => handleUpdate(event, element.id, element)}>
            Update
          </Button>
          <Button size="small" onClick={() => handleDelete(element)}>
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CategoryCourse;
