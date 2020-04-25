import axios from "axios";
const baseUrl = "/api/blogs";

// LogeedIn user token
let token = null;

// Setting the loggedin user Token given by server
const setToken = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  const user = JSON.parse(loggedUserJSON);
  if (user) {
    token = `bearer ${user.token}`;
  }
};

setToken();

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("BlogService token", token);
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// Adding Like on a blog
const addLike = async (blogToLike) => {
  const id = blogToLike.id;
  const blogToSend = {
    title: blogToLike.title,
    author: blogToLike.author,
    url: blogToLike.url,
    likes: blogToLike.likes + 1,
  };
  const blogUrl = baseUrl + "/" + id;
  const response = await axios.put(blogUrl, blogToSend);
  return response.data;
};

// Posting a comment on a blog entry
const comment = async (id, content) => {
  const url = `${baseUrl}/${id}/comment`;
  const commentToPost = {
    content: content,
  };
  const response = await axios.post(url, commentToPost);
  console.log(response.data);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const blogUrl = baseUrl + "/" + blog.id;
  try {
    const response = await axios.delete(blogUrl, config);
    console.log(
      "From Delete BlogService Token: ",
      token,
      "blogUrl: ",
      blogUrl,
      "response: ",
      response
    );
    return response;
  } catch (exception) {
    console.log(exception);
  }
};

export default { getAll, create, setToken, addLike, comment, deleteBlog };
