import React from "react";

// Button to Show the Details of the Country
const Button = props => {
  const show = () => {
    const country = [];
    country[0] = props.country;
    props.setResult(country);
  };

  return <button onClick={show}>Show</button>;
};

// Component to list all the given countries
const ListCountries = props =>
  props.list.map((country, index) => (
    <div key={index}>
      {country.name}
      <Button country={country} setResult={props.setResult} />
    </div>
  ));

// Component to display all given languages
const ListLanguages = props =>
  props.list.map((item, index) => <div key={index}>{item.name}</div>);

// Component to view the Details of a given country
const Details = props => {
  console.log("Arrived at the details");
  const country = props.country;

  return (
    <div>
      <h2>{country.name}</h2>
      Capital {country.capital}
      <br />
      Population {country.population}
      <br />
      <h4>Languages</h4> <br />
      <ListLanguages list={country.languages} /> <br />
      <img src={country.flag} alt="Flag" width="170px"></img>
    </div>
  );
};

const Display = props => {
  const result = props.result;
  const setResult = props.setResult;

  const filterDisplay = () => {
    if (result.length > 10) {
      return "Too many matches, specify another filter";
    } else if (result.length === 1) {
      return <Details key="1" country={result[0]} />;
    } else if (result.length > 1) {
      return <ListCountries list={result} setResult={setResult} />;
    }
  };

  return <div>{filterDisplay()}</div>;
};

export default Display;
