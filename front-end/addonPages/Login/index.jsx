import React from "react";
import { inject, observer } from "mobx-react";
import { TextField, PrimaryButton } from "office-ui-fabric-react";
import { setLocation } from "../../utils";

@inject("addonStore")
@observer
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    if (localStorage.getItem("Token") == "auth") {
      setLocation("home");
    }
  }
  updateUsername = event => {
    this.setState({ username: event.target.value });
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSignIn = () => {
    const { addonStore } = this.props;
    addonStore.signIn(this.state.username, this.state.password, () => {
      this.checkAuthenticated();
    });
  };

  render() {
    return (
      <div>
        <TextField label="Username" onChange={this.updateUsername} required />
        <TextField
          label="Password"
          onChange={this.updatePassword}
          type="password"
          required
        />
        <PrimaryButton
          text="Login"
          onClick={this.handleSignIn}
          style={{ marginTop: "1rem" }}
        />
      </div>
    );
  }
}
