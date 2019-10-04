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
      onderwerp: "",
      ondertekenaar: "",
      bijlage: "",
      datum: "",
      contactpersoon: "",
      aanhef: "",
      naam: "",
      groetregel: "",
      toevoeging: "",
      adres: "",
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
          options={letterFormStore.signatures}
          onChange={this.dropDownOnChange}
        />
        <TextField
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
            onChange={this.dropDownOnChange}
            styles={{ root: { width: 200 } }}
          />
          <TextField
            label="Naam"
            id="naam"
            styles={{ root: { width: 200 } }}
            onChange={this.textFieldOnChange}
          />
        </Stack>
        <Dropdown
          label="Groetregel"
          id="groetregel"
          options={letterFormStore.greetings}
          onChange={this.dropDownOnChange}
        />
        <TextField
          label="Groetregel toevoeging"
          id="toevoeging"
          multiline
          rows={2}
          resizable={false}
          onChange={this.textFieldOnChange}
        />
        <TextField
          label="Adres"
          id="adres"
          multiline
          rows={6}
          resizable={false}
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
