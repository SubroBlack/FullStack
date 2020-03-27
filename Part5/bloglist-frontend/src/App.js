import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [likes, setLikes] = useState(0);
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

  // Adding a blog
  const addBlog = async event => {
    event.preventDefault();
    console.log("SENDing Note");

    const newBlog = {
      title,
      author,
      url,
      likes
    };

    const addedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(addedBlog));

    // Setting the notification
    setNotification(`Added ${title} by ${author} in the collection`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);

    // Clearing the Blog add Form
    setTitle("");
    setAuthor("");
    setURL("");
    setLikes(0);
  };

  // Logging In
  const handleLogin = async event => {
    try {
      event.preventDefault();
      console.log("Loginng In");

      // Get User token from server
      const newUser = await loginService.login({ username, password });

      //Save the User in Browser
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);

      // Clear the Login Form
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("Wrong Credentials");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.log(exception);
    }
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

  // Form to Add Blog
  const addBlogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type="url"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          type="number"
          min="0"
          value={likes}
          name="Likes"
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );

  // Form to login
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

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
          </p>{" "}
          {addBlogForm()}
        </div>
      )}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
