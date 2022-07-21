import React, { useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ posts }) => {
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={6} sm={4} md={4}>
          <Post post={post} _id={post._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
