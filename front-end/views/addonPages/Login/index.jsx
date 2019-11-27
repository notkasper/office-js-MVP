import React from "react";
import { setLocation } from "../../../utils";
import { PrimaryButton, Text, Stack, Image } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";
import mslogo from "../../../assets/mslogo.png";

@inject("addonStore")
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { addonStore } = this.props;
    const authorized = addonStore.checkAuthorized();
    if (authorized) {
      setLocation("home");
      return;
    }
    addonStore.listenToCookieChanges(() => {
      setLocation("home");
    });
  }

  handleClick = () => {
    const { addonStore } = this.props;
    this.setState({ loading: true });
    addonStore.authorize();
  };

  render() {
    const { loading } = this.state;
    return (
      <div style={{ marginLeft: "60px", marginTop: "300px" }}>
        <PrimaryButton
          iconProps={{ iconName: "WindowsLogo" }}
          styles={{ root: { height: "40px", width: "200px" } }}
          text="Inloggen"
          onClick={this.handleClick}
          disabled={loading}
        />
      </div>
    );
  }
}
