const notification = "";

export const notify = (message) => {
  return {
    type: "NOTIFY",
    message: message,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR",
    message: "",
  };
};

const notificationReducer = (state = notification, action) => {
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
