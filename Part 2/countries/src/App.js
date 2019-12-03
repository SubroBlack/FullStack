import React, { useState } from "react";
import "./App.css";

import axios from "axios";

const List = props =>
  props.list.map((item, index) => <div key={index}>{item.name}</div>);

const Display = props => {
  const country = props.country;

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h4>Languages</h4>
      <p>
        <List list={country.languages} />
      </p>
      <img src={country.flag} alt="Flag" width="170px"></img>
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
      return <List list={result} />;
    }
  };

  return (
    <div>
      Search for a country
      <input type="text" onChange={changeSearch} onKeyUp={search} />
      <br />
      {filterDisplay()}
    </div>
  );
};

export default App;
