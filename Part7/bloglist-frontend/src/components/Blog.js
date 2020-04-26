import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { like, deleteBlog } from "../reducers/blogReducer";

import Togglable from "./Togglable";
import CommentForm from "./commentForm";

import { Card, CardHeader, CardContent, Button } from "@material-ui/core";

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
    <Card raised={true}>
      <CardHeader title={blog.title} />
      <CardContent>
        <p>By {blog.author}</p>
        <p>Found at: {blog.url}</p>
        <p>
          with {blog.likes} likes <Button onClick={addLike}>Add Like</Button>
        </p>
        <p>
          <Button color="secondary" onClick={del}>
            Delete
          </Button>
        </p>
      </CardContent>

      <CardContent>
        <br />
        <Togglable buttonLabel="Comments">
          <ul>
            {blog.comments.map((a) => (
              <li key={a.id}>{a.content}</li>
            ))}
          </ul>
        </Togglable>
        <br />
        <CommentForm blog={blog} />
      </CardContent>
    </Card>
  );
};

export default Blog;
