import React from "react";
import { inject, observer } from "mobx-react";
import {
  Stack,
  CompoundButton,
  Pivot,
  PivotItem,
  Image
} from "office-ui-fabric-react";
import dotOfficeImage from "../../../assets/do365Docs-160.png";

@inject("addonStore")
@observer
export default class Home extends React.Component {
  componentDidMount() {
    const { addonStore } = this.props;
    addonStore.getProfile();
  }

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

  authorize = () => {
    const { addonStore } = this.props;
    addonStore.authorize();
  };

  renderActions = () => {
    return (
      <Stack vertical tokens={{ childrenGap: "5px" }}>
        <CompoundButton
          secondaryText="Maak een nieuwe brief"
          onClick={this.openLetterForm}
        >
          Brief
        </CompoundButton>
        <CompoundButton secondaryText="Maak een nieuwe fax" disabled={true}>
          Fax
        </CompoundButton>
        <CompoundButton secondaryText="Maak een nieuwe memo" disabled={true}>
          Memo
        </CompoundButton>
        <CompoundButton secondaryText="Maak een nieuw rapport" disabled={true}>
          Rapport
        </CompoundButton>
      </Stack>
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

  renderProfiles = () => {
    return (
      <Stack vertical tokens={{ childrenGap: "5px" }}>
        <CompoundButton
          secondaryText="Maak een nieuw profiel"
          onClick={this.openForm1}
        >
          Profiel
        </CompoundButton>
      </Stack>
    );
  };

  render() {
    return (
      <div>
        <Pivot styles={{ itemContainer: { marginTop: "8px" } }}>
          <PivotItem headerText="Nieuw">{this.renderActions()}</PivotItem>
          <PivotItem headerText="Profielen">{this.renderProfiles()}</PivotItem>
        </Pivot>
        <Image
          src={dotOfficeImage}
          alt="DotOffice"
          width="128px"
          styles={{ root: { position: "absolute", bottom: 0, right: "50px" } }}
        />
      </div>
    );
  }
}
