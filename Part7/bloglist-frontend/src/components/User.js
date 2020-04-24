import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const userById = (id) => users.find((a) => a.id === id);
  const blogId = useParams().id;

  if (!users) {
    return null;
  }

  const user = userById(blogId);
  console.log("From User: ", user.blogs);
  return (
    <div className="UserDetails">
      <h3>{user.name}</h3>
      <b>Added Blogs</b>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
