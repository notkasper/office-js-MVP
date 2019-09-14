import React from "react";
import { PrimaryButton } from "office-ui-fabric-react";

const DIALOG_HOST = "https://localhost:8081";

export default class DialogButton extends React.Component {
  openDialog = () => {
    console.log("Opening dialog...");
    Office.context.ui.displayDialogAsync(
      DIALOG_HOST,
      { height: 64, width: 64, displayInIframe: true },
      result => {
        console.log(`Dialog open result: ${JSON.stringify(result)}`);
      }
    );
  };

  render() {
    return <PrimaryButton onClick={this.openDialog}>Open Dialog</PrimaryButton>;
  }
}
