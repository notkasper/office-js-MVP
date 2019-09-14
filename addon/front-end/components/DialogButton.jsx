import React from "react";
import { PrimaryButton, Stack } from "office-ui-fabric-react";

const DIALOG_HOST = "https://localhost:8081";

export default class DialogButton extends React.Component {
  openDialog = dialogName => {
    console.log("Opening dialog...");
    Office.context.ui.displayDialogAsync(
      `${DIALOG_HOST}/${dialogName}`,
      { height: 64, width: 64, displayInIframe: true },
      result => {
        console.log(`Dialog open result: ${JSON.stringify(result)}`);
      }
    );
  };

  openForm1 = () => {
    this.openDialog("user_form_1");
  };

  openForm2 = () => {
    this.openDialog("user_form_2");
  };

  render() {
    return (
      <Stack horizontal>
        <PrimaryButton onClick={this.openForm1}>Open Form1</PrimaryButton>
        <PrimaryButton onClick={this.openForm2}>Open Form2</PrimaryButton>
      </Stack>
    );
  }
}
