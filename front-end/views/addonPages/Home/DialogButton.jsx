import React from "react";
import { PrimaryButton, Stack } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";
import { setLocation } from "../../../utils";

@inject("addonStore")
@observer
export default class DialogButton extends React.Component {
  openDialog = (dialogName, width, height, callback) => {
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/#${dialogName}`,
      { height, width, displayInIframe: true },
      result => {
        if (result.status !== "succeeded") {
          console.error(
            `Something went wrong while opening the dialog: ${JSON.stringify(
              result
            )}`
          );
          callback(true);
          return;
        }
        callback(false, result.value);
      }
    );
  };

  openForm1 = () => {
    this.openDialog("form1", 85, 85, (error, dialog) => {
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

  openLetterForm = () => {
    this.openDialog("letter_form", 43, 67, (error, dialog) => {
      if (error) {
        return;
      }
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, arg => {
        const message = JSON.parse(arg.message).messageType;
        switch (message) {
          case "closeDialog":
            dialog.close();
            break;
          default:
            console.error(`Received unhandled message from dialog: ${message}`);
            return;
        }
      });
    });
  };

  render() {
    return (
      <Stack
        vertical
        styles={{ root: { maxWidth: "200px" } }}
        tokens={{ childrenGap: ".3rem" }}
      >
        <PrimaryButton onClick={this.openForm1}>Open Form1</PrimaryButton>
        <PrimaryButton onClick={this.openLetterForm}>
          Open Letter Form
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            setLocation("page_2");
            console.log(window.location);
          }}
        >
          Go to page 2
        </PrimaryButton>
      </Stack>
    );
  }
}
