import React, { useState } from "react";
import "./App.css";

import axios from "axios";

import Display from "./components/display";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  const changeSearch = event => {
    setSearchTerm(event.target.value);
  };

  const search = event => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
      .then(res => {
        console.log(res.data);
        setResult(res.data);
      });
  };

  return (
    <div>
      Search for a country
      <input type="text" onChange={changeSearch} onKeyUp={search} />
      <Display result={result} setResult={setResult} />
    </div>
  );
};

export default App;
