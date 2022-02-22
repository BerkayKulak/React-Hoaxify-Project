import React from "react";
import { signup,changeLanguage } from "../api/apiCall";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
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
    const { t } = this.props;
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = "Password mismatch";
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();

    const { username, displayName, password, passwordRepeat } = this.state;

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

  onChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  render() {
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t } = this.props;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          />
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={this.onClickSignup}
              disabled={
                this.state.pendingApiCall || passwordRepeat !== undefined
              }
            >
              {this.state.pendingApiCall ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                ""
              )}
              {t("Sign Up")}
            </button>
          </div>
          <div>
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src="https://icons.iconarchive.com/icons/wikipedia/flags/256/TR-Turkey-Flag-icon.png"
              alt="tr"
              onClick={() => this.onChangeLanguage("tr")}
            ></img>
            <img
              style={{ width: "100px", cursor: "pointer" }}
              src="https://images.thdstatic.com/productImages/db985bd3-d47b-4b1a-a270-a1bd84e55b62/svn/seasonal-designs-house-flags-rf3n-64_1000.jpg"
              alt="en"
              onClick={() => this.onChangeLanguage("en")}
            ></img>
          </div>
        </form>
      </div>
    );
  }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;
