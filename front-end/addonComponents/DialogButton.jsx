import React from "react";
import { PrimaryButton, Stack } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";

@inject("addonStore")
@observer
export default class DialogButton extends React.Component {
  openDialog = (dialogName, callback) => {
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/${dialogName}`,
      { height: 64, width: 64, displayInIframe: true },
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
        <PrimaryButton onClick={() => this.props.addonStore.setRoute("page_2")}>Go to page 2</PrimaryButton>
      </Stack>
    );
  }
}
