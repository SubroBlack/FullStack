import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const BlogList = () => {
  const result = useSelector((state) => state.blogs);
  let blogs;
  blogs = result;
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <h3>Blogs</h3>
            </TableCell>
            <TableCell>
              <h3>Authors</h3>
            </TableCell>
          </TableRow>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blog/${blog.id}`}>
                  <b>{blog.title}</b>
                </Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
