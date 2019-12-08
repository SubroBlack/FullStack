import React from "react";

// Button
const Button = props => {
  const id = props.id;
  const deletePerson = props.deletePerson;
  return <button onClick={deletePerson(id)}>Delete</button>;
};

// Component to display the Person
const Contact = props => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};

// Display for the array of Contacts
const Display = props =>
  props.persons.map(person => (
    <div key={person.id}>
      <Contact name={person.name} number={person.number} />
      <Button deletePerson={props.deletePerson} id={person.id} />
    </div>
  ));

export default Display;
