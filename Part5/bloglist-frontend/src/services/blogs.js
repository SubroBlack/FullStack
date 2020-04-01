import axios from "axios";
const baseUrl = "/api/blogs";

// LogeedIn user token
let token = null;

// Setting the loggedin user Token given by server
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const addLike = async blogToLike => {
  const id = blogToLike.id;
  const blogToSend = {
    title: blogToLike.title,
    author: blogToLike.author,
    url: blogToLike.url,
    likes: blogToLike.likes + 1
  };
  const blogUrl = baseUrl + "/" + id;
  const response = await axios.put(blogUrl, blogToSend);
  return response.data;
};

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  };

  const blogUrl = baseUrl + "/" + blog.id;
  const response = await axios.delete(blogUrl, config);
  return response;
};

export default { getAll, create, setToken, addLike, deleteBlog };
