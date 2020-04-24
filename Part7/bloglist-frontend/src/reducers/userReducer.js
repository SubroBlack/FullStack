import userService from "../services/users";

// Initialize Users in the store
export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: "ALL_USERS",
      users: users,
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "ALL_USERS":
      return action.users;
    default:
      return state;
  }
};

export default userReducer;
