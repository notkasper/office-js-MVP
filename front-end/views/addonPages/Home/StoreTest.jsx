import React from "react";
import { inject, observer } from "mobx-react";
import { PrimaryButton, Text, Stack } from "office-ui-fabric-react";

@inject("addonStore")
@observer
export default class Header extends React.Component {
  render() {
    const { addonStore } = this.props;
    return (
      <Stack vertical>
        <Text>Counter using a mobx store</Text>
        <Stack horizontal>
          <PrimaryButton onClick={addonStore.incrementCounter}>
            Click me!
          </PrimaryButton>
          <Text>{addonStore.counter}</Text>
        </Stack>
      </Stack>
    );
  }
}
