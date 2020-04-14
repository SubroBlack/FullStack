import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue("");
  };

  const props = {
    type,
    value,
    onChange,
  };
  return { clear, props };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // Fetching all the resources
  useEffect(() => {
    const request = axios.get(baseUrl);
    request.then((response) => setResources(response.data));
  }, [resources, baseUrl]);

  const create = async (resource) => {
    // ...
    const response = await axios.post(baseUrl, resource);
    return response.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit ", content.props.value);
    await noteService.create({ content: content.props.value });
    content.clear();
  };

  const handlePersonSubmit = async (event) => {
    event.preventDefault();
    await personService.create({
      name: name.props.value,
      number: number.props.value,
    });
    name.clear();
    number.clear();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.props} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.props} /> <br />
        number <input {...number.props} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
