import React, { useEffect, useRef, useState } from "react";
import AdminPost from "./Post/AdminPost";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

const AdminPosts = ({ posts }) => {
  const classes = useStyles();
  console.log(posts);

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
          <AdminPost post={post} _id={post._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminPosts;
