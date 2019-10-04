import React from "react";
import { inject, observer } from "mobx-react";
import {
  Stack,
  CompoundButton,
  Pivot,
  PivotItem,
  Image,
  textAreaProperties
} from "office-ui-fabric-react";
import dotOfficeImage from "../../../assets/do365Docs-160.png";

@inject("addonStore")
@observer
export default class Home extends React.Component {
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

  generateText = (dialog, data) => {
    // Run a batch operation against the Word object model.
    Word.run(context => {
      // Create a proxy object for the document body.
      const body = context.document.body;

      // Queue a command to insert text in to the beginning of the body.

      const adressParagraph = body.insertParagraph(data.adres, "start");
      adressParagraph.styleBuiltIn = "Heading9";
      const onderwerpParagraph = body.insertParagraph(data.onderwerp, "end");
      onderwerpParagraph.font.set({
        italic: false,
        bold: true,
        size: 13
      });
      body.insertBreak(Word.BreakType.line, "end");
      const naamParagraph = body.insertParagraph(
        `${data.aanhef} ${data.naam},`,
        "end"
      );
      naamParagraph.font.set({
        italic: false,
        bold: false,
        size: 12
      });
      const textBody = body.insertParagraph("voeg hier uw text toe", "end");
      textBody.styleBuiltIn = "NoSpacing";
      body.insertBreak(Word.BreakType.line, "end");
      const groetParagraaf = body.insertParagraph(data.groetregel, "end");
      groetParagraaf.styleBuiltIn = "Normal";
      if (data.toevoeging.length) {
        const toevoegParagraaf = body.insertParagraph(data.toevoeging, "end");
        toevoegParagraaf.styleBuiltIn = "Normal";
      }
      //body.insertBreak(Word.BreakType.line, "end");
      const ondertekenParagraaf = body.insertParagraph(
        data.ondertekenaar + data.contactpersoon,
        "end"
      );
      ondertekenParagraaf.styleBuiltIn = "Normal";
      body.insertBreak(Word.BreakType.line, "end");
      const bijlageTitle = body.insertParagraph("Bijlage(n):", "end");
      bijlageTitle.font.set({
        bold: true,
        size: 12
      });
      const bijlageParagraaf = body.insertParagraph(data.bijlage, "end");
      bijlageParagraaf.styleBuiltIn = "Normal";

      // Synchronize the document state by executing the queued commands,
      // and return a promise to indicate task completion.
      return context.sync().then(function() {
        dialog.close();
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };
  openLetterForm = () => {
    this.openDialog("letter_form", 70, 70, (error, dialog) => {
      if (error) {
        return;
      }
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, arg => {
        const { messageType, data } = JSON.parse(arg.message);
        switch (messageType) {
          case "closeDialog":
            dialog.close();
            break;
          case "text":
            this.generateText(dialog, data);
            break;
          default:
            console.error(
              `Received unhandled message from dialog: ${messageType}`
            );
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
