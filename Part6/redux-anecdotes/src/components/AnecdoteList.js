import React from "react";
import { connect } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;

  const vote = (anecdote) => {
    props.voteFor(anecdote);
    props.setNotification("You Voted For: " + anecdote.content, 5);
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

const mapStatetoProps = (state) => {
  let anecdotes;
  const filter = state.filter.toLowerCase();
  const result = state.anecdotes;
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
  return {
    anecdotes: anecdotes,
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStatetoProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
