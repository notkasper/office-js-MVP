import React from "react";
import { inject, observer } from "mobx-react";
import { Stack } from "office-ui-fabric-react";
import ApiTest from "./ApiTest";
import DialogButton from "./DialogButton";
import StoreTest from "./StoreTest";
import ImageTest from "./ImageTest";

@inject("addonStore")
@observer
export default class TestComponents extends React.Component {
  render() {
    return (
      <Stack vertical>
        <DialogButton />
        <ApiTest />
        <StoreTest />
        <ImageTest />
      </Stack>
    );
  }
}
