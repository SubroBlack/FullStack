import React from "react";

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
    <Contact key={person.id} name={person.name} number={person.number} />
  ));

export default Display;
