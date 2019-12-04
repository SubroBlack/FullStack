import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Search from "./components/Search";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //Fetch data from server
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => {
      const persons = res.data;
      setPersons(persons);
    });
  }, []);

  // Save new contact in phonebook
  const saveContact = event => {
    event.preventDefault();

    // Prevent repreating saves
    const names = persons.map(person => person.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newContact = {
        name: newName,
        number: newNumber
      };
      axios.post("http://localhost:3001/persons", newContact).then(res => {
        setPersons(persons.concat(res.data));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  // Change name in input field
  const changeName = event => {
    setNewName(event.target.value);
  };

  // Change number in input field
  const changeNumber = event => {
    setNewNumber(event.target.value);
  };

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
      <h2>Phonebook</h2>
      <Search
        searchTerm={searchTerm}
        searchResult={searchResult}
        changeSearch={changeSearch}
        search={search}
      />
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
