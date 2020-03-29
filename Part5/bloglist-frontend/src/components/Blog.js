import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const showBlog = () => {
    if (!showDetails) {
      return (
        <div onClick={toggleShowDetails}>
          <b>{blog.title}</b> - {blog.author}
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={toggleShowDetails}>
            <b>{blog.title}</b>
          </div>
          <p>By {blog.author}</p>
          <p>Found at: {blog.url}</p>
          <p>
            with {blog.likes} likes{" "}
            <button onClick={addLike(blog)}>Add Like</button>{" "}
          </p>
          <p>
            <button onClick={deleteBlog(blog)}>Delete</button>
          </p>
        </div>
      );
    }
  };

  return <div>{showBlog()}</div>;
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

export default Blog;
