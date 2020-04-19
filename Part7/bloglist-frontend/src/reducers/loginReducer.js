import loginService from "../services/login";
import { notify } from "./notificationReducer";

// Setting a logged in User in store
const setUser = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

// Setting a User when signin In
export const signIn = (username, password) => {
  return async (dispatch) => {
    try {
      // Get User token from server
      const loggedUser = await loginService.login({ username, password });

      //Save the User in Browser
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      );
      dispatch(setUser(loggedUser));
    } catch (exception) {
      dispatch(notify(`Cannot Login: ${exception}`, 10));
      console.log(exception);
    }
  };
};

// Checking if the user is logged in during reloads
export const setLoggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    const user = JSON.parse(loggedUserJSON);
    console.log("Logged user", user);
    //blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

// Logging out of User
export const clearLoggedUser = () => {
  return async (dispatch) => {
    console.log("Logged out user");
    await window.localStorage.removeItem("loggedBlogAppUser");
    dispatch({
      type: "CLEAR_USER",
      user: null,
    });
  };
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "CLEAR_USER":
      return action.user;
    default:
      return state;
  }
};

export default loginReducer;
