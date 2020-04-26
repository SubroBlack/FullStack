import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/loginReducer";
import { useHistory } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";

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
        <TextField
          label="username"
          onChange={handleUsernameChange}
          type="text"
          value={username}
          name="Username"
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <br />
      <Button color="primary" type="submit">
        Login
      </Button>
      <br />
      <Button color="secondary" onClick={cancel}>
        Cancel
      </Button>
    </form>
  );
};

export default LoginForm;
