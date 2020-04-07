import React from "react";

import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { notify, clearNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createNew(newAnecdote));
    dispatch(notify(content + " added to the Collection"));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
