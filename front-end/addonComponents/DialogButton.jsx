import React from "react";
import { PrimaryButton, Stack } from "office-ui-fabric-react";

export default class DialogButton extends React.Component {
  openDialog = (dialogName, callback) => {
    console.log("Opening dialog...");
    console.log(window.location.origin);
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/${dialogName}`,
      { height: 85, width: 85, displayInIframe: true },
      result => {
        if (result.status !== "succeeded") {
          console.error(
            `Something went wrong while opening the dialog: ${result}`
          );
          callback(true);
          return;
        }
        callback(false, result.value);
      }
    );
  };

  openForm1 = () => {
    this.openDialog("form1", (error, dialog) => {
      if (error) {
        return;
      }
      dialog.addEventHandler(
        Office.EventType.DialogMessageReceived,
        message => {
          console.log(`Message received: ${message}`);
        }
      );
    });
  };

  render() {
    return (
      <Stack horizontal>
        <PrimaryButton onClick={this.openForm1}>Open Form1</PrimaryButton>
      </Stack>
    );
  }
}
