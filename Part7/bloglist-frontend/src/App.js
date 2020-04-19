import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { initializeBlogs } from "./reducers/blogReducer";
import { setLoggedUser, clearLoggedUser } from "./reducers/loginReducer";
import Logout from "./components/LogoutForm";

const App = () => {
  // useDispatch hook from react-redux library
  const dispatch = useDispatch();

  // Fetching the Blog List
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Checking if the User is logged in
  useEffect(() => {
    dispatch(setLoggedUser());
  }, [dispatch]);

  // The saved user in the Browser
  const loggedUser = useSelector((state) => state.login);
  console.log(loggedUser);

  return (
    <div>
      <h2>blogs</h2>
      <h4>
        <Notification />
      </h4>
      {loggedUser === null ? (
        <div>
          <Link to={"/login"}>Login</Link>
        </div>
      ) : (
        <div>
          <p>
            {loggedUser.name} is logged in
            <Logout />
          </p>
          <Togglable buttonLabel="Add Blog Form" ref={React.createRef()}>
            <AddBlogForm />
          </Togglable>
        </div>
      )}
      <Switch>
        <Route path="/blog/:id">
          <Blog />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <div className="blogs">
            <BlogList />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
