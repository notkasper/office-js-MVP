import React from "react";
import { setLocation } from "../../../utils";
import { PrimaryButton, Text, Stack } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";

@inject("addonStore")
@observer
export default class Auth extends React.Component {
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
      <Stack tokens={{ childrenGap: "16px" }}>
        <Text vertical>Log in om de addon te gebruiken</Text>
        <PrimaryButton
          styles={{ root: { height: "3em" } }}
          text="Inloggen"
          onClick={this.handleClick}
          disabled={loading}
        />
      </Stack>
    );
  }
}
