import React from "react";

import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { notify, clearNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    dispatch(createNew(event.target.content.value));
    dispatch(notify(event.target.content.value + " added to the Collection"));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    event.target.content.value = "";
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
