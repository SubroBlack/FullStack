import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { like, deleteBlog } from "../reducers/blogReducer";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogById = (id) => blogs.find((a) => a.id === id);
  const blog = blogById(useParams().id);

  // useDispatch hook to call actionCreator
  const dispatch = useDispatch();

  // useHistory hook to redirect
  const history = useHistory();

  // Add like in the Blog
  const addLike = () => {
    dispatch(like(blog));
  };

  // Delete Blog
  const del = () => {
    dispatch(deleteBlog(blog));
    history.push("/");
  };

  if (blogs.length < 1) {
    return null;
  }

  return (
    <div className="BlogDetails">
      <div className="DetailsClick">
        <b>{blog.title}</b>
      </div>
      <p>By {blog.author}</p>
      <p>Found at: {blog.url}</p>
      <p>
        with {blog.likes} likes <button onClick={addLike}>Add Like</button>{" "}
      </p>
      <p>
        <button onClick={del}>Delete</button>
      </p>
    </div>
  );
};

export default Blog;
