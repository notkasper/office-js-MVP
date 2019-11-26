import React from "react";
import { inject, observer } from "mobx-react";
import { Stack, CompoundButton, Pivot, PivotItem, Image } from "office-ui-fabric-react";
import Profiles from "./profiles";
import genericLogo from "../../../assets/generic-logo.jpg";

@inject("addonStore")
@observer
export default class Home extends React.Component {
  componentDidMount() {
    const { addonStore } = this.props;
    addonStore.getUserDetails();
  }

  generateLetter = async (dialog, data) => {
    const { addonStore } = this.props;
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        data[key] = "NIET INGEVULD";
      }
    });
    console.log(data);
    addonStore.getProfiles((error, response) => {
      const profile = addonStore.getProfile(data.contactpersoon);
      addonStore.generateLetter((error, response) => {
        if (error) {
          return;
        }
        const letterTemplateBase64 = response.body.data;
        Word.run(async context => {
          // define utility function
          const fillFieldWith = async (contentControlName, value, position = "replace") => {
            const contentControls = context.document.contentControls;
            contentControls.load("items");
            await context.sync();
            const taggedCcs = contentControls.getByTag(contentControlName);
            taggedCcs.load("items");
            await context.sync();
            if (!taggedCcs.items.length) {
              throw new Error(`No content control found with tag ${contentControlName}`);
            }
            for (const cc of taggedCcs.items) {
              cc.insertText(value, position);
              await context.sync();
            }
          };

          context.document.body.clear();
          context.document.body.insertFileFromBase64(letterTemplateBase64, "start");
          await context.sync();
          await fillFieldWith("straat_straatnummer", `${data.straatnaam} ${data.huisnummer}`);
          await fillFieldWith("postcode_plaatsnaam", `${data.postcode} ${data.plaatsnaam}`);
          await fillFieldWith("datum", data.datum.substring(0, 10));
          await fillFieldWith("aanhef_naam", `${data.aanhef} ${data.voornaam} ${data.achternaam},`);
          await fillFieldWith("groetregel", data.groetOptie);
          await fillFieldWith("naam-ondertekenaar", profile.formal_name);
          dialog.close();
        });
      });
    });
  };

  openLetterForm = () => {
    const width = 35;
    const height = 52;

    Office.context.ui.displayDialogAsync(
      `${window.location.origin}#letter_form`,
      { height, width, displayInIframe: true },
      result => {
        if (result.status !== "succeeded") {
          console.error(`Something went wrong while opening the dialog: ${JSON.stringify(result)}`);
          return;
        }
        const dialog = result.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, arg => {
          const { messageType, data } = JSON.parse(arg.message);
          switch (messageType) {
            case "closeDialog":
              dialog.close();
              break;
            case "createLetter":
              this.generateLetter(dialog, data);
              break;
            default:
              console.error(`Received unhandled message from dialog: ${messageType}`);
              return;
          }
        });
      }
    );
  };

  authorize = () => {
    const { addonStore } = this.props;
    addonStore.authorize();
  };

  renderActions = () => {
    return (
      <React.Fragment>
        <Stack vertical tokens={{ childrenGap: "5px" }}>
          <CompoundButton secondaryText="Maak een nieuwe brief" onClick={this.openLetterForm}>
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
        <Image
          src={genericLogo}
          alt="DotOffice"
          width="128px"
          styles={{ root: { position: "absolute", bottom: 0, right: "24px" } }}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Pivot styles={{ itemContainer: { marginTop: "8px" } }}>
        <PivotItem headerText="Sjablonen">{this.renderActions()}</PivotItem>
        <PivotItem headerText="Profielen">
          <Profiles />
        </PivotItem>
      </Pivot>
    );
  }
}
