import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../query/queries";

const EditAuthor = (props) => {
  const [born, setBorn] = useState(0);

  const result = useQuery(ALL_AUTHORS);
  let authors = [];
  let options = [];

  if (!result.loading) {
    authors = result.data.allAuthors;
    options = authors.map((a) => ({ value: a.name, label: a.name }));
  }

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

    editAuthor({
      variables: { name: event.target.authorName.value, setBornTo: born },
    });
    setBorn(0);
  };

  return (
    <div>
      <h3>Change the Birth Year of Author</h3>
      <form onSubmit={submit}>
        <h4>Select Author</h4>
        <Select name="authorName" options={options} defaultValue={null} />
        <br />
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
