import React, { useEffect, useState } from "react";
import IMG_PLACEHOLDER from "../images/not-found.png";
import { Headline, MainDataWrapper, TagList } from "./MainData.styled";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { CircularProgress } from "@mui/material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";

const MainData = ({ post }) => {
  const classes = useStyles(); //importing css

  var tags = ["N/A"]; //initialising default tag

  if (post.tags.length > 0) {
    tags = post.tags.split(",");
  }
  var message = "No description";
  if (!post) {
    if (post.message.length > 0) {
      message = post.message;
    }
  }
  const [dbdata, setDbData] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/getSinglePost/${post.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setDbData(json);
      });
  }, []);

  // console.log("UseEffect Render");
  // console.log(dbdata);
  return (
    <>
      <Grid item align="center" xs={12} sm={4} md={4}>
        <Card className={classes.card}>
          {!dbdata ? (
            <CircularProgress />
          ) : dbdata.selectedFile.length > 0 ? (
            <CardMedia
              className={classes.media}
              image={dbdata.selectedFile}
              title={post.title}
            />
          ) : (
            <CardMedia
              className={classes.media}
              src="../images/not-found.png"
              title={post.title}
            />
          )}
        </Card>
      </Grid>

      <MainDataWrapper xs={12} sm={6} md={6}>
        <div className="text-side">
          <Headline>
            <h1>Creator: {post.creator}</h1>
            <div>
              <span>
                <ThumbUpAltIcon />
              </span>
              {":"}
              <span>{post.likeCount}</span>
            </div>
          </Headline>

          <span>
            {" "}
            <strong className="mt">Tags:</strong>{" "}
          </span>
          <TagList>
            {tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </TagList>
          <br></br>
          <span>
            <strong className="mt">
              Title: <u>{post.title}</u>
            </strong>

            <br></br>
            <strong className="mt">Description:</strong>
            <div
              className="summary"
              dangerouslySetInnerHTML={{
                __html: dbdata
                  ? dbdata.message
                  : "Text is Loading......Please Wait for 30 sec and refresh!!!!!",
              }}
            />
          </span>
        </div>
      </MainDataWrapper>
    </>
  );
};

export default MainData;
