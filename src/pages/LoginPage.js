import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCall";

import ButtonWithProgress from "../components/ButtonWithProgress";
class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
 
  };

  

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };
    this.setState({
      error: null,
    });
    try {
      await login(creds);
    } catch (apiError) {
      console.log(apiError.response.statusText);
      this.setState({
        error: apiError.response.statusText,
      });
    }
  };

  render() {
    const { t ,pendingApiCall} = this.props;

    const { username, password, error } = this.state;

    const buttonEnabled = username && password;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            label={t("Username")}
            name="username"
            onChange={this.onChange}
          />
          <Input
            label={t("Password")}
            name="password"
            type="password"
            onChange={this.onChange}
          />
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-center">
            <ButtonWithProgress
              onClick={this.onClickLogin}
              disabled={!buttonEnabled || pendingApiCall}
              pendingApiCall={pendingApiCall}
              text={t("Login")}
            ></ButtonWithProgress>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LoginPage);
