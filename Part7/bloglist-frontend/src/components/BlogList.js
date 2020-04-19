import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const result = useSelector((state) => state.blogs);
  let blogs;
  blogs = result;
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <b>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </b>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
