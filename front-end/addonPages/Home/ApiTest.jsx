import React from "react";
import { PrimaryButton, Text, Stack } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";

@inject("addonStore")
@observer
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  handleClick = () => {
    const { addonStore } = this.props;
    addonStore.testApi((error, response) => {
      if (error) {
        console.error(error);
        return;
      }
      const message = response.body.message;
      this.setState({ message: message });
    });
  };

  render() {
    return (
      <Stack vertical>
        <Text>Api Test Call</Text>
        <PrimaryButton onClick={this.handleClick}>
          Click me to test the API!
        </PrimaryButton>
        <Stack horizontal>
          <Text>response:</Text>
          <Text>{this.state.message}</Text>
        </Stack>
      </Stack>
    );
  }
}
