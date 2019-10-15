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
  PrimaryButton,
  MaskedTextField
} from "office-ui-fabric-react";

@inject("letterFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: "",
      contactpersoon: "",
      aanhef: "",
      naam: "",
      groetregel: "",
      toevoeging: "",
      straatnaam: "",
      straatnummer: null,
    };
  }

  componentDidMount() {
    const { letterFormStore } = this.props;
    letterFormStore.getProfiles();
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
    this.setState({ [event.target.id]: option.text });
  };

  closeDialog = () => {
    Office.context.ui.messageParent(
      JSON.stringify({ messageType: "closeDialog" })
    );
  };

  createLetter = () => {
    Office.context.ui.messageParent(
      JSON.stringify({ messageType: "createLetter", data: this.state })
    );
  };

  renderMainpanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { padding: "0 .3em" } }}>
        <Stack horizontal tokens={{ childrenGap: "1em" }}>
          <TextField
            value={this.state.straatnaam}
            label="Straatnaam"
            id="straatnaam"
            styles={{ root: { width: "50%" } }}
            onChange={this.textFieldOnChange}
          />
          <TextField
            value={this.state.huisnummer}
            label="Huisnummer"
            id="huisnummer"
            onChange={this.textFieldOnChange}
            styles={{ root: { width: "50%" } }}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: "1em" }}>
          <TextField
            label="Plaatsnaam"
            id="plaatsnaam"
            value={this.state.plaatsnaam}
            onChange={this.textFieldOnChange}
            styles={{ root: { width: "50%" } }}
          />
          <MaskedTextField
            label="Postcode"
            id="postcode"
            value={this.state.postcode}
            onChange={this.textFieldOnChange}
            styles={{ root: { width: "50%" } }}
            mask="9999 aa"
          />
        </Stack>
        <DatePicker placeholder="Selecteer datum" label="Datum" />
        <Stack horizontal tokens={{ childrenGap: "1em" }}>
          <Dropdown
            label="Aanhef"
            id="aanhef"
            options={letterFormStore.salutations}
            placeholder={this.state.aanhef}
            onChange={this.dropDownOnChange}
            styles={{ root: { width: "50%" } }}
          />
          <TextField
            value={this.state.naam}
            label="Naam"
            id="naam"
            onChange={this.textFieldOnChange}
            styles={{ root: { width: "50%" } }}
          />
        </Stack>
        <Dropdown
          label="Groetregel"
          id="groetregel"
          placeholder={this.state.groetregel}
          options={letterFormStore.greetings}
          onChange={this.dropDownOnChange}
        />
        <Dropdown
          label="Contactpersoon"
          id="contactpersoon"
          placeholder={this.state.contactpersoon}
          options={letterFormStore.contacts.map(contact => {
            return { key: contact.id, text: contact.formal_name };
          })}
          onChange={this.dropDownOnChange}
          disabled={false}
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
              <PrimaryButton text="OK" onClick={this.createLetter} />
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
        {this.renderMainpanel()}
        {this.renderFooter()}
      </Stack>
    );
  }
}
