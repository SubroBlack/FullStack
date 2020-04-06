const filter = "";

export const search = (filter) => {
  return {
    type: "FILTER",
    filter: filter,
  };
};

const filterReducer = (state = filter, action) => {
  switch (action.type) {
    case "FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
