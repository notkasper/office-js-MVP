import React from "react";
import { PrimaryButton, Text, Stack } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";

@inject("application")
@observer
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  handleClick = () => {
    const { application } = this.props;
    application.testApi((error, response) => {
      if (error) {
        console.error(error);
        return;
      }
      const message = response.body.message;
      console.log(`Response message: ${message}`);
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
