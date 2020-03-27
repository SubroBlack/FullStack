import React, { useState, useEffect } from "react";

import Display from "./components/Display";
import Search from "./components/Search";
import personsService from "./services/persons";

import "./App.css";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  } else {
    return <div className="notification">{notification}</div>;
  }
};

const Error = ({ error }) => {
  if (error === null) {
    return null;
  } else {
    return <div className="error">{error}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  //Fetch data from server
  useEffect(() => {
    personsService.getAll().then(res => {
      setPersons(res);
    });
  }, []);

  // Save new contact in phonebook
  const saveContact = event => {
    event.preventDefault();

    // Prevent repreating saves
    const repeatPerson = persons.filter(person => person.name === newName);
    const newContact = {
      name: newName,
      number: newNumber
    };
    if (repeatPerson.length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .editPerson(repeatPerson[0].id, newContact)
          .then(res => {
            setNotification(
              `Changed the number of ${res.name} in the phonebook.`
            );
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(
              persons.filter(person => person.name !== newName).concat(res)
            );
          })
          .catch(error => {
            setError(`Could not edit the contact: ${error}`);
          });
      }
    } else {
      // Sending Data to server
      personsService
        .create(newContact)
        .then(res => {
          setNotification(`Added ${res.name} in the phonebook.`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setPersons(persons.concat(res));
        })
        .catch(error => {
          console.log("ERROR: ", error);
          setError(`Failed: ${error.message}`);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  // Delete an Entry from Phonebook
  const deletePerson = id => () => {
    if (window.confirm("Delete the contact?")) {
      personsService.deletePerson(id).catch(error => {
        setError(`Could not delete the contact: ${error}`);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
      setPersons(persons.filter(person => person.id !== id));
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
      <Notification notification={notification} />
      <Error error={error} />
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
      <Display persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
