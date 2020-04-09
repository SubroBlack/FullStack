let count = 0;
let code = "";

// Setting Notification with message to be diplayed and duration of notification in sec.
const Notify = (message) => {
  console.log("Notification set", message);
  return {
    type: "NOTIFY",
    message: message,
  };
};

const clear = () => {
  count = 0;
  console.log("CLEAR called, count 0");
  return {
    type: "CLEAR",
    message: "",
  };
};

export const setNotification = (message, sec) => {
  return async (dispatch) => {
    dispatch(Notify(message));
    count = count + 1;
    console.log("Count reached", count);
    if (count > 1) {
      clearTimeout(code);
      console.log("TIMEOUT Cleared");
    }
    code = setTimeout(() => {
      dispatch(clear());
    }, sec * 1000);
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.message;
    case "CLEAR":
      return action.message;
    default:
      return state;
  }
};

export default notificationReducer;
