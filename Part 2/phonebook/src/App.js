import React, { useState } from "react";

const Search = props => {};

const Contact = props => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};

const Display = props =>
  props.persons.map(person => (
    <Contact key={person.id} name={person.name} number={person.number} />
  ));

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "0283528348" },
    { id: 2, name: "A", number: "2" },
    { id: 3, name: "B", number: "3" },
    { id: 4, name: "C", number: "4" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const saveContact = event => {
    event.preventDefault();

    const names = persons.map(person => person.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newContact = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
      console.log("Submitted");
    }
  };

  const changeName = event => {
    setNewName(event.target.value);
  };

  const changeNumber = event => {
    setNewNumber(event.target.value);
  };

  const changeSearch = event => {
    setSearchTerm(event.target.value);
  };

  const search = event => {
    const result = persons.filter(
      person => searchTerm.toLowerCase() === person.name.toLowerCase()
    );
    if (result.length > 0) {
      console.log(result);
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with:{" "}
      <input
        type="text"
        value={searchTerm}
        onChange={changeSearch}
        onKeyUp={search}
      />
      <Display persons={searchResult} />
      <h2>add a new</h2>
      <form onSubmit={saveContact}>
        <div>
          name: <input value={newName} onChange={changeName} />
          <br />
          number: <input value={newNumber} onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={persons} />
    </div>
  );
};

export default App;
