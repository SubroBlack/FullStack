import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/loginReducer";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  //useDispatch Hook to call ActionCreators
  const dispatch = useDispatch();

  // useHistory hook to redirect
  const history = useHistory();

  // Sign IN
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Loginng In");
    await dispatch(signIn(username, password));
    // Clear the Login Form
    setUsername("");
    setPassword("");
    history.push("/");
  };

  // Cancel the Login
  const cancel = () => {
    history.push("/");
  };

  return (
    // Form to login
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          onChange={handleUsernameChange}
          type="text"
          value={username}
          name="Username"
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login" type="submit">
        Login
      </button>
      <br />
      <button onClick={cancel}>Cancel</button>
    </form>
  );
};

export default LoginForm;
