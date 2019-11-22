import React from "react";
import Display from "./Display";

// Search Functionality and DIspaly Result
const Search = props => {
  const searchTerm = props.searchTerm;
  const searchResult = props.searchResult;

  const changeSearch = props.changeSearch;
  const search = props.search;

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
