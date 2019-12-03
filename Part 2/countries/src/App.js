import React, { useState } from "react";
import "./App.css";

import axios from "axios";

const List = props =>
  props.countries.map(country => (
    <div>
      <p key={country.alpha2Code}>{country.name}</p>
    </div>
  ));

const Display = props => {
  const country = props.country;

  return (
    <div>
      <p>{country.name}</p>
      <p>{country.capital}</p>
    </div>
  );
};

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

  const filterDisplay = () => {
    if (result.length > 10) {
      return "Too many matches, specify another filter";
    } else if (result.length === 1) {
      return <Display key="1" country={result[0]} />;
    } else if (result.length > 1) {
      return <List countries={result} />;
    }
  };

  return (
    <div>
      Search for a country:
      <input type="text" onChange={changeSearch} onKeyUp={search} />
      <br />
      {filterDisplay()}
    </div>
  );
};

export default App;
