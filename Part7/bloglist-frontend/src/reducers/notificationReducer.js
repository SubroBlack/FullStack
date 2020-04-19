let count = 0;
let code = "";

// Function to notify of anything
const setMessage = (message) => {
  return {
    type: "NOTIFY",
    data: message,
  };
};

const clear = () => {
  count = 0;
  return {
    type: "CLEAR",
    data: "",
  };
};

// Setting Notification with message to be displayed and duration of notification in sec.
export const notify = (message, sec) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    count = count + 1;
    if (count > 1) {
      clearTimeout(code);
    }
    code = setTimeout(() => {
      dispatch(clear());
    }, sec * 1000);
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data;
    case "CLEAR":
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
