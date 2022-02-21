import React from "react";
import { signup } from "../api/apiCall";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();

    const { username, displayName, password } = this.state;

    const body = {
      username,
      displayName,
      password,
    };
    this.setState({ pendingApiCall: true });
    // signup(body)
    //   .then((response) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ pendingApiCall: false });
    //   });

    try {
      const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { errors } = this.state;
    const { username } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <div className="form-group">
            <label>Username</label>
            <input
              class={username ? "form-control is-invalid" : "form-control"}
              name="username"
              onChange={this.onChange}
            />
            <div id="validationServer03Feedback" className="invalid-feedback">
              {username}
            </div>
          </div>
          <div>
            <label>Display Name</label>
            <input
              className="form-control"
              name="displayName"
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              onChange={this.onChange}
              type="password"
            />
          </div>
          <div>
            <label>Password Confirm</label>
            <input
              className="form-control"
              name="passwordRepeat"
              onChange={this.onChange}
              type="password"
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={this.onClickSignup}
              disabled={this.state.pendingApiCall}
            >
              {this.state.pendingApiCall ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
