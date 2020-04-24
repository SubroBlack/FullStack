import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Blog from "./components/Blog";
import User from "./components/User";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Logout from "./components/LogoutForm";

import { initializeBlogs } from "./reducers/blogReducer";
import { getUsers } from "./reducers/userReducer";
import { setLoggedUser } from "./reducers/loginReducer";

import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";

const App = () => {
  // useDispatch hook from react-redux library
  const dispatch = useDispatch();

  // Fetching the Blog List
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  // Checking if the User is logged in
  useEffect(() => {
    dispatch(setLoggedUser());
  }, [dispatch]);

  // The saved user in the Browser
  const loggedUser = useSelector((state) => state.login);
  console.log(loggedUser);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            <h2>Blogs</h2>
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {loggedUser === null ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <>
              <Button color="inherit">
                <Logout />
              </Button>
              <Button color="inherit" component={Link} to="/addBlog">
                Add Blog
              </Button>
              <Button color="default">{loggedUser.name} is logged in</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <h4>
        <Notification />
      </h4>
      <Switch>
        <Route path="/blog/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/addBlog">
          <AddBlogForm />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <div className="blogs">
            <BlogList />
          </div>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
