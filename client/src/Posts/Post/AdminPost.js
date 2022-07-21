import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import useStyles from "./styles";
import moment from "moment";
import { updatePost, deletePost } from "../../actions/posts";

const AdminPost = ({ post, _id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const url = "http://localhost:3000";
  // console.log(post);
  const [likes, setLikes] = useState(post.likeCount);
  const [view, setView] = useState(false);
  const [Delete, setDelete] = useState(null);

  const handlelike = () => {
    // console.log(post._id);
    setLikes((prev) => prev + 1);
    post.likeCount += 1;
    dispatch(updatePost(post._id, post));
  };

  const handleUnlike = async () => {
    if (likes !== 0) {
      setLikes((prev) => prev - 1);
      post.likeCount -= 1;
      dispatch(updatePost(post._id, post));
    }
  };

  const handleDelete = () => {
    // console.log(post._id);
    if (
      window.confirm(
        `Do you want to delete the item "${post.title}" ? Click "OK" to delete the item.`
      )
    ) {
      setDelete(post._id);
      dispatch(deletePost(post._id));
      window.location.reload();
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="small">
          <Link to={`admin/${post._id}`}>
            <OpenInNewIcon fontSize="small" />
          </Link>
        </Button>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handlelike}>
          <ThumbUpAltIcon fontSize="small" />
          Like {likes}
        </Button>
        <Button size="small" color="primary" onClick={handleUnlike}>
          <ThumbDownAltIcon fontSize="small" />
          UnLike
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
      <CardContent align="center">
        <Button style={{ color: "white" }} size="small">
          <Link to={`admin/${post._id}`}>Read More</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminPost;
