import React from "react";
import { inject, observer } from "mobx-react";
import {
  Stack,
  CompoundButton,
  Pivot,
  PivotItem,
  Image
} from "office-ui-fabric-react";
import Profiles from "./profiles";
import dotOfficeImage from "../../../assets/do365Docs-160.png";

@inject("addonStore")
@observer
export default class Home extends React.Component {
  componentDidMount() {
    const { addonStore } = this.props;
    addonStore.getUserDetails();
  }

  generateLetter = (dialog, data) => {
    const { addonStore } = this.props;
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        data[key] = "NIET INGEVULD";
      }
    });
    console.log(data);
    addonStore.generateLetter((error, response) => {
      if (error) {
        return;
      }
      const letterTemplateBase64 = response.text;
      Word.run(async context => {
        // define utility function
        const fillFieldWith = async (
          contentControlName,
          value,
          position = "replace"
        ) => {
          const contentControls = context.document.contentControls;
          const taggedCcs = contentControls.getByTag(contentControlName);
          taggedCcs.load("items");
          await context.sync();
          for (const cc of taggedCcs.items) {
            cc.insertText(value, position);
            await context.sync();
          }
        };

        context.document.body.clear();
        context.document.body.insertFileFromBase64(
          letterTemplateBase64,
          "start"
        );
        await context.sync();
        await fillFieldWith("straat-afzender", data.straatnaam);
        await fillFieldWith("huisnummer", data.huisnummer.toString());
        await fillFieldWith("postcode-afzender", data.postcode);
        await fillFieldWith("datum", data.datum.toString().substring(0, 10));
        await fillFieldWith("aanhef-voornam", data.voornaam);
        await fillFieldWith("aanhef-achternaam", data.achternaam);
        await fillFieldWith("straat-aanhef", data.straatnaam);
        await fillFieldWith("huisnummer-aanhef", data.huisnummer);
        await fillFieldWith(
          "postcode-aanhef",
          `${data.postcode}, ${data.plaatsnaam}`
        );
        await fillFieldWith("groet1", data.aanhef);
        await fillFieldWith("aanhef-achternaam", data.achternaam);
        await fillFieldWith(
          "inhoud",
          "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten."
        );
        await fillFieldWith("groet", data.groetregel);
        dialog.close();
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
          console.error(
            `Something went wrong while opening the dialog: ${JSON.stringify(
              result
            )}`
          );
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
              console.error(
                `Received unhandled message from dialog: ${messageType}`
              );
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
          <CompoundButton
            secondaryText="Maak een nieuw rapport"
            disabled={true}
          >
            Rapport
          </CompoundButton>
        </Stack>
        <Image
          src={dotOfficeImage}
          alt="DotOffice"
          width="128px"
          styles={{ root: { position: "absolute", bottom: 0, right: "50px" } }}
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
