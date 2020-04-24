import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const result = useSelector((state) => state.users);
  let users;
  users = result;

  if (!users) {
    return null;
  }

  console.log("USERs from List: ", users);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>
              <h3>Users</h3>
            </th>
            <th>Number of Blogs</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <b>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </b>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
