import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetching the Blog List
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  // Checking if the User is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Sign IN
  const handleLogin = async event => {
    event.preventDefault();
    console.log("Loginng In");
    try {
      // Get User token from server
      const loggedUser = await loginService.login({ username, password });

      blogService.setToken(loggedUser.token);
      setUser(loggedUser);

      //Save the User in Browser
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      );

      // Clear the Login Form
      setUsername("");
      setPassword("");

      return loggedUser;
    } catch (exception) {
      setNotification("Wrong Credentials");
      console.log(exception);
    }
  };

  // Show Login Form
  const loginForm = () => (
    <Togglable buttonLabel="Login Form">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => {
          setUsername(target.value);
        }}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  );

  // Show AddBlog Form
  const blogFormRef = React.createRef();
  const blogForm = () => (
    <Togglable buttonLabel="Add Blog Form" ref={blogFormRef}>
      <AddBlogForm createBlog={addBlog} setNotification={setNotification} />
    </Togglable>
  );

  // Post Blog
  const addBlog = async newBlog => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
  };

  // Add like in the Blog
  const addLike = blogToLike => {
    const like = async () => {
      const returnedBlog = await blogService.addLike(blogToLike);
      const initialBlogs = blogs.filter(blog => blog.id !== blogToLike.id);
      setBlogs(initialBlogs.concat(returnedBlog));
    };
    return like;
  };

  // Logout
  const handleLogout = async event => {
    try {
      event.preventDefault();
      console.log("Logging Out!");

      window.localStorage.removeItem("loggedBlogAppUser");

      blogService.setToken(null);
      setUser(null);

      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  // The saved user in the Browser
  const loggedUser = window.localStorage.getItem("loggedBlogAppUser");
  console.log(loggedUser);

  return (
    <div>
      <h2>blogs</h2>
      <h4>
        <Notification message={notification} />
      </h4>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {" "}
            {user.name} is logged in
            <button onClick={handleLogout}>Logout</button>{" "}
          </p>
          {blogForm()}
        </div>
      )}
      {blogs
        .sort((a, b) => {
          return b.likes - a.likes;
        })
        .map(blog => (
          <Blog key={blog.id} blog={blog} addLike={addLike} />
        ))}
    </div>
  );
};

export default App;
