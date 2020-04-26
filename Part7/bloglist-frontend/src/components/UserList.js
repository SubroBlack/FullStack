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

const UserList = () => {
  const result = useSelector((state) => state.users);
  let users;
  users = result;

  if (!users) {
    return null;
  }
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <h3>Users</h3>
            </TableCell>
            <TableCell>
              <h3>Number of Blogs</h3>
            </TableCell>
          </TableRow>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <b>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </b>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
