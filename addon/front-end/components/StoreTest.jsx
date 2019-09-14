import React from "react";
import { inject, observer } from "mobx-react";
import { PrimaryButton, Text, Stack } from "office-ui-fabric-react";

@inject("application")
@observer
export default class Header extends React.Component {
  render() {
    const { application } = this.props;
    return (
      <Stack vertical>
        <Text>Counter using a mobx store</Text>
        <Stack horizontal>
          <PrimaryButton onClick={application.incrementCounter}>
            Click me!
          </PrimaryButton>
          <Text>{application.counter}</Text>
        </Stack>
      </Stack>
    );
  }
}
