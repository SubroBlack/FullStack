import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { notify, clearNotification } from "../reducers/notificationReducer";

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
    console.log("vote", anecdote.id);
    dispatch(voteFor(anecdote.id));
    dispatch(notify("You voted for " + anecdote.content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
