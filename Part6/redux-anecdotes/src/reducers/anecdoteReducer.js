export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createNew = (data) => {
  return {
    type: "NEW",
    data,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

const anecdoteReducer = (state = [], action) => {
  //console.log("state now: ", state);
  //console.log("action", action);

  switch (action.type) {
    case "VOTE":
      console.log(action.data);

      const anecdote = state.filter((obj) => obj.id === action.data.id)[0];
      anecdote.votes = anecdote.votes + 1;
      const otherAnecdotes = state.filter((obj) => obj.id !== action.data.id);
      return otherAnecdotes.concat(anecdote);
    case "NEW":
      console.log("New Stuff", action.data);
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
