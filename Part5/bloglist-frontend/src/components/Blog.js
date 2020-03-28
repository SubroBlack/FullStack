import React, { useState } from "react";

const Blog = ({ blog, addLike }) => {
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
        </div>
      );
    }
  };

  return <div>{showBlog()}</div>;
};

export default Blog;
