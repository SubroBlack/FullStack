import React, { useState, useEffect } from "react";

import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  // Checking if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  //Function to logout
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // Menu
  const menu = () => {
    if (token) {
      return (
        <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("editAuthor")}>Edit Author</button>
          <button onClick={logout}>Logout</button>
        </>
      );
    } else {
      return <button onClick={() => setPage("Login")}>Login</button>;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {menu()}
      </div>

      <Login show={page === "Login"} setToken={setToken} />

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} token={token} />

      <NewBook show={page === "add"} token={token} />

      <EditAuthor show={page === "editAuthor"} token={token} />
    </div>
  );
};

export default App;
