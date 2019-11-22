import React, { useState } from "react";
import Display from "./Display";

// Search Functionality and DIspaly Result
const Search = props => {
  const persons = props.persons;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Search Term
  const changeSearch = event => {
    setSearchTerm(event.target.value);
  };

  // Search for the term and return the result
  const search = event => {
    const result = persons.filter(
      person => searchTerm.toLowerCase() === person.name.toLowerCase()
    );
    if (result.length > 0) {
      setSearchResult(result);
    } else {
      // Return empty array if result dont match
      setSearchResult([]);
    }
  };

  return (
    <div>
      filter shown with:{" "}
      <input
        type="text"
        value={searchTerm}
        onChange={changeSearch}
        onKeyUp={search}
      />
      <Display persons={searchResult} />
    </div>
  );
};

export default Search;
