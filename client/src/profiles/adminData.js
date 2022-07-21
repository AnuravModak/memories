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
import FileBase from "react-file-base64";
import { useParams } from "react-router-dom";

import { updateAdminPost } from "../actions/posts";

import useStyles from "./adminStyles";
import { getSinglePost } from "../actions/posts";
import { FETCH } from "../constants/actionTypes";
const Admin = ({ post }) => {
  const { id } = useParams();

  const classes = useStyles();

  const initialData = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(post);
  const [prevData, setPrevData] = useState(post);

  const dispatch = useDispatch();
  console.log(postData);

  const handleUpdate = (e) => {
    if (
      window.confirm(
        "Do you really want to edit the changes from database?? Please Click 'OK' to continue!!"
      )
    ) {
      dispatch(updateAdminPost(id, postData));
    }
  };

  const handleResetImage = () => {
    setPostData({ ...postData, selectedFile: prevData.selectedFile });
  };

  const clear = () => {
    if (
      window.confirm(
        "Do you really want to refresh?? Please Click 'OK' to continue!!"
      )
    ) {
      setPostData((prev) => initialData);
    }
  };

  const handleImage = (img) => {
    setPrevData({ ...prevData, selectedFile: postData.selectedFile });
    setPostData({ ...postData, selectedFile: img });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Edit a memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          required
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />

        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          required
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          required
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          multiline
          rows={10}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <span>
            <strong>Change Pic: </strong>{" "}
          </span>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => handleImage(base64)}
          />
        </div>
        <div>
          {postData.selectedFile.length > 0 ? (
            <img
              className={classes.buttons}
              src={`${postData.selectedFile}`}
              alt="not found"
              width="30%"
              height="70%"
            />
          ) : (
            "No image found"
          )}
          <Button
            className={classes.buttons}
            variant="contained"
            color="secondary"
            size="medium"
            type="submit"
            onClick={handleResetImage}
          >
            Reset Image
          </Button>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          pt={2}
          size="medium"
          type="submit"
          fullWidth
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          fullWidth
          onClick={clear}
        >
          Reset
        </Button>
      </form>
    </Paper>
  );
};

export default Admin;
