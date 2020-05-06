import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE, ME } from "../query/queries";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  // Fetch all the books
  const result = useQuery(ALL_BOOKS);
  // Fetch the current User
  const current = useQuery(ME);

  // LAzy Query to Fetch books based on the genres
  const [getBooksByGenre, resultBooksByGenre] = useLazyQuery(BOOKS_BY_GENRE, {
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  // Updating the books to be rendered
  useEffect(() => {
    if (resultBooksByGenre.data) {
      setBooks(resultBooksByGenre.data.allBooks);
    } else if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data, resultBooksByGenre.data]);

  // Function to send the Query for books of a genre
  const showBooksByGenre = (genre) => {
    getBooksByGenre({ variables: { genre: genre } });
  };

  // SHow only recommended Books
  const recommended = () => {
    if (current.data) {
      showBooksByGenre(current.data.me.favoriteGenre);
    }
  };

  if (!props.show) {
    return null;
  }

  // SHow list of genres to Choose the BOoks by GenRes
  const genresList = () => {
    const arr = result.data.allBooks
      .map((b) => {
        return b.genres.map((g) => g);
      })
      .flat(1);
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    let genres = arr.filter(unique);

    return (
      <div>
        <button onClick={() => showBooksByGenre("")}>All Books</button>
        {genres.map((g) => {
          return (
            <button key={g} onClick={() => showBooksByGenre(g)}>
              {g}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h2>books</h2>
      <button onClick={recommended}>Recommended</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {props.recommendation ? null : genresList()}
    </div>
  );
};

export default Books;
