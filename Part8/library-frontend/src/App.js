import React, { useState, useEffect } from "react";

import { useApolloClient, useSubscription } from "@apollo/client";

import { BOOK_ADDED, ALL_BOOKS } from "./query/queries";

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

  // Updating the cache
  const updateCacheWith = (addedBook) => {
    if (!addedBook) {
      return null;
    }
    console.log("update cache ", addedBook);
    const includedIn = (set, object) => {
      return set.map((p) => p.id).includes(object.id);
    };
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  // Subscription to added book
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log("Added Book ", addedBook);
      window.alert(`Books Added: ${addedBook.title}`);
      updateCacheWith(addedBook);
    },
  });

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

      <NewBook
        show={page === "add"}
        token={token}
        updateCacheWith={updateCacheWith}
      />

      <EditAuthor show={page === "editAuthor"} token={token} />
    </div>
  );
};

export default App;
