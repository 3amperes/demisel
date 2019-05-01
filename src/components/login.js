import React from "react";
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from "../services/auth";

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  };

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    handleLogin(this.state);
  };

  render() {
    if (isLoggedIn()) {
      navigate(`/pro/profile`);
    }

    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event);
            navigate(`/pro/profile`);
          }}
        >
          <div>
            <label>
              <div>Username</div>
              <input type="text" name="username" onChange={this.handleUpdate} />
            </label>
          </div>
          <div>
            <label>
              <div>Password</div>

              <input
                type="password"
                name="password"
                onChange={this.handleUpdate}
              />
            </label>
          </div>
          <br />
          <input type="submit" value="Log In" />
        </form>
      </>
    );
  }
}

export default Login;
