import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { like, deleteBlog } from "../reducers/blogReducer";
import CommentForm from "./commentForm";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogId = useParams().id;

  // useDispatch hook to call actionCreator
  const dispatch = useDispatch();

  // useHistory hook to redirect
  const history = useHistory();

  // Note returning anything if blogs havent loaded yet
  if (!blogs) {
    return null;
  }

  //Finding a specific Blog
  const blogById = (id) => blogs.find((a) => a.id === id);
  const blog = blogById(blogId);

  if (!blog) {
    return null;
  }

  console.log(blog);

  // Add like in the Blog
  const addLike = () => {
    dispatch(like(blog));
  };

  // Delete Blog
  const del = () => {
    dispatch(deleteBlog(blog));
    history.push("/");
  };

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
      <div>
        <h4>Comments</h4>
        <CommentForm blog={blog} />
        <ul>
          {blog.comments.map((a) => (
            <li key={a.id}>{a.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
