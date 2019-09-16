import React from "react";
import { inject, observer } from "mobx-react";
import { TextField, PrimaryButton } from "office-ui-fabric-react";

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
    this.cookieCheck();
  }

  cookieCheck() {
    const { addonStore } = this.props;
    if (Office.context.document.settings.get("token")) {
      this.props.addonStore.setRoute("home");
    }
  }
  updateUsername = event => {
    this.setState({ username: event.target.value });
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { addonStore } = this.props;
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
          onClick={() => {
            addonStore.signIn(this.state.username, this.state.password, () => {
              this.cookieCheck();
            });
          }}
          style={{ marginTop: "1rem" }}
        />
      </div>
    );
  }
}
