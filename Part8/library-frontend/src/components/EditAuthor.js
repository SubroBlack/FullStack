import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../query/queries";

const EditAuthor = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(0);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("sending editStuff", name, born);
    editAuthor({ variables: { name, setBornTo: born } });
    setName("");
    setBorn(0);
  };

  return (
    <div>
      <h3>Change the Birth Year of Author</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">Edit Author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
