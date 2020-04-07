import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const result = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter).toLowerCase();
  let anecdotes;
  if (filter.length > 0) {
    anecdotes = result.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  } else {
    anecdotes = result;
  }
  anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote));
    dispatch(setNotification("You Voted For: " + anecdote.content, 5));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
