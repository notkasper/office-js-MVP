import React from "react";
import { inject, observer } from "mobx-react";
import {
  Stack,
  Dropdown,
  TextField,
  Icon,
  Separator,
  DatePicker,
  Text,
  DefaultButton,
  Checkbox
} from "office-ui-fabric-react";

@inject("letterFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onderwerp: "Brief",
      ondertekenaar: "Dhr. ",
      bijlage:
        "You spend hours trying to figure out the solution to the hints for the TraC trip and really want to know if your answer was correct? You want to know if you have been the first to guess the location right? Then come to the Location Reveal! You will get first hand information about where CognAC is going between the 23rd of April - 1st of May and get a first glance at the planned activities during the trip. Bring your lunch and let the TraC spark your Wanderlust!",
      datum: "4 oktober 2019",
      contactpersoon: "Jan Koeken",
      aanhef: "Beste ",
      naam: "Francious",
      groetregel: "Hartelijke groet, ",
      toevoeging: "",
      adres: "Vincent van Goghlaan 64 5246 GB  Rosmalen",
      kenmerk: ""
    };
  }

  textFieldOnChange = event => {
    const {
      target: { id, value }
    } = event;
    const newStateBody = {};
    newStateBody[id] = value;
    this.setState(newStateBody);
  };

  dropDownOnChange = (event, option) => {
    const { id } = event.target;
    const newStateBody = {};
    newStateBody[id] = option.text;
    this.setState(newStateBody);
  };

  closeDialog = () => {
    Office.context.ui.messageParent(
      JSON.stringify({ messageType: "closeDialog" })
    );
  };

  writeInDocument = () => {
    console.log("suppose to be writing");
    Office.context.ui.messageParent(
      JSON.stringify({ messageType: "text", data: this.state })
    );
  };

  renderLeftPanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { width: 400 } }}>
        <TextField
          value={this.state.onderwerp}
          label="Onderwerp"
          id="onderwerp"
          onChange={this.textFieldOnChange}
        />
        <Dropdown
          label="Ondertekenaar"
          id="ondertekenaar"
          placeholder={this.state.ondertekenaar}
          options={letterFormStore.signatures}
          onChange={this.dropDownOnChange}
        />
        <TextField
          value={this.state.bijlage}
          label="Bijlage(n)"
          id="bijlage"
          onChange={this.textFieldOnChange}
          multiline
          rows={8}
          resizable={false}
        />
        <DatePicker placeholder="Selecteer datum" label="Kies een datum" />
        <Dropdown
          label="Contactpersoon"
          id="contactpersoon"
          placeholder={this.state.contactpersoon}
          options={letterFormStore.contacts}
          onChange={this.dropDownOnChange}
          disabled
        />
      </Stack>
    );
  };

  renderRightPanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { width: 400 } }}>
        <Stack horizontal tokens={{ childrenGap: "1em" }}>
          <Dropdown
            label="Aanhef"
            id="aanhef"
            options={letterFormStore.salutations}
            placeholder={this.state.aanhef}
            onChange={this.dropDownOnChange}
            styles={{ root: { width: 200 } }}
          />
          <TextField
            value={this.state.naam}
            label="Naam"
            id="naam"
            styles={{ root: { width: 200 } }}
            onChange={this.textFieldOnChange}
          />
        </Stack>
        <Dropdown
          label="Groetregel"
          id="groetregel"
          placeholder={this.state.groetregel}
          options={letterFormStore.greetings}
          onChange={this.dropDownOnChange}
        />
        <TextField
          label="Groetregel toevoeging"
          id="toevoeging"
          multiline
          rows={2}
          resizable={false}
          value={this.state.toevoeging}
          onChange={this.textFieldOnChange}
        />
        <TextField
          label="Adres"
          id="adres"
          multiline
          rows={6}
          resizable={false}
          value={this.state.adres}
          onChange={this.textFieldOnChange}
        />
        <TextField
          label="Ons kenmerk"
          id="kenmerk"
          onChange={this.textFieldOnChange}
        />
      </Stack>
    );
  };

  renderHeader = () => {
    return (
      <Stack vertical tokens={{ childrenGap: ".3em" }}>
        <Stack horizontal>
          <Icon
            iconName="TextDocument"
            styles={{ root: { fontSize: "3em", color: "DodgerBlue" } }}
          />
          <Text
            variant="xxLarge"
            styles={{ root: { color: "DodgerBlue", paddingLeft: ".3em" } }}
          >
            Brief
          </Text>
        </Stack>
        <Separator />
      </Stack>
    );
  };

  renderFooter = () => {
    return (
      <Stack vertical tokens={{ childrenGap: ".3em" }}>
        <Separator />
        <Stack>
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: "8px" }}>
              <DefaultButton text="OK" onClick={this.writeInDocument} />
              <DefaultButton
                text="Annuleren"
                onClick={this.closeDialog}
                styles={{ paddingLeft: "30px" }}
              />
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack>
    );
  };

  render() {
    return (
      <Stack vertical>
        {this.renderHeader()}
        <Stack horizontal tokens={{ childrenGap: "10px" }}>
          {this.renderLeftPanel()}
          {this.renderRightPanel()}
        </Stack>
        {this.renderFooter()}
      </Stack>
    );
  }
}
