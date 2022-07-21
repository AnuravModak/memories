import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  AppBar,
  Grow,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {} from "@material-ui/core";
import useStyles from "./styles";
import PersonIcon from "@mui/icons-material/Person";
import memories from "./images/memories.png";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Form from "./Forms/Form";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Switch, Route } from "react-router-dom";
import Posts from "./Posts/Posts";
import AdminPosts from "./Posts/AdminPosts";


import Profile from "./profiles/profile";

import Admin from "./profiles/adminData";
import AdminLog from "./profiles/admin";

const App = () => {
  const classes = useStyles(); //using css markup here...

  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/getPosts", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
      });
  }, []);

  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              Memories
            </Typography>
            <img src={memories} alt="icon" height="60" />
            <Button style={{ color: "white" }} size="small">
              <Link to={`/admin`}>
                <AdminPanelSettingsIcon size="large" />
              </Link>
            </Button>
          </AppBar>

          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch">
                <Grid item xs={12} sm={12}>
                  <Posts posts={posts} />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/admin">
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              Admin Dashboard
            </Typography>
            <img
              // className={classes.image}
              src={memories}
              alt="icon"
              height="60"
            />

            <Button style={{ color: "white" }} size="small">
              <Link to={`/`}>
                <PersonIcon size="large" />
              </Link>
            </Button>
          </AppBar>

          <Grow in>
            <Container>
              <Grid
                container
                justify="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <AdminPosts posts={posts} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Route>
      </Switch>

      <Switch>
        <Route
          exact
          path="/memories/:id/:createdAt/:creator/:isLiked/:tags/:likeCount/:title?"
        >
          <Profile posts={posts} />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/admin/:id">
          <AdminLog />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
