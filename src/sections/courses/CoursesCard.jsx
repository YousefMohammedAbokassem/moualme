import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { customDecrypt } from 'src/utils/hashingFunction';

const CoursesCard = ({ element, handleDelete, handleUpdate, mainPage, handleAddCourse }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: '350px' }}>
      {/* {element?.introduction_video === undefined ? null : (
          <iframe
            width="350"
            height="315"
            src={`https://www.youtube.com/embed/${customDecrypt(element?.introduction_video)}?si=7erLKeQtKJ0cHYn3`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )} */}
      <a href={`${process.env.REACT_APP_API_URL_IMAGE}/${element.introduction_video}`} target="_blank" rel="noreferrer">
        <CardMedia
          sx={{ height: 140 }}
          image={`${process.env.REACT_APP_API_URL_IMAGE}/${element.image}`}
          title={element.name}
        />
      </a>
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          <b>Course Name:</b>
          {element?.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <b>Description:</b> {element?.description}
        </Typography>
        {/* <Stack spacing={2}> */}
        <Typography gutterBottom variant="body2" component="div">
          <b>Teacher Name:</b>
          {element?.teacher_name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          <b>Hours: </b>
          {element?.hours}h
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          <b>Price: </b>
          {element?.price}
        </Typography>
        {/* </Stack> */}
      </CardContent>
      {mainPage && (
        <CardActions sx={{ justifyContent: 'space-between  ' }}>
          <Button
            onClick={() => navigate(`/dashboard/courses/chapter/${element?.id}?name=${element?.name}`)}
            size="small"
          >
            Learn More
          </Button>
          <Stack direction="row" spacing={2}>
            <Button size="small" onClick={() => handleDelete(element?.id)}>
              Delete
            </Button>
            <Button size="small" onClick={() => handleUpdate(element)}>
              Update
            </Button>
            {/* <Button size="small" onClick={() => handleAddCourse(element)}>
              Add to category
            </Button> */}
          </Stack>
        </CardActions>
      )}
    </Card>
  );
};

export default CoursesCard;
