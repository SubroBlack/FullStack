import React from "react";

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange
}) => {
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
    </form>
  );
};

export default LoginForm;
