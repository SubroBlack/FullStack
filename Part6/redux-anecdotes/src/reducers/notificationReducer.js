// Setting Notification with message to be diplayed and duration of notification in sec.
export const setNotification = (message, sec) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFY",
      message: message,
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR",
        message: "",
      });
    }, sec * 1000);
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY":
      console.log("Switch ", action.message);
      return action.message;
    case "CLEAR":
      return action.message;
    default:
      return state;
  }
};

export default notificationReducer;
