import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CardMedia,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Admin from "./adminData";

import { getSinglePost } from "../actions/posts";

const AdminLog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  try {
    useEffect(() => {
      dispatch(getSinglePost(id));
    }, []);
  } catch (error) {
    console.log("Error", error.message);
  }

  const data = useSelector((state) => state.posts);
  console.log(data);

  return data._id ? <Admin post={data} /> : <CircularProgress />;
};

export default AdminLog;
