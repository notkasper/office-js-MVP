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
  PrimaryButton
} from "office-ui-fabric-react";

@inject("letterFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onderwerp: "Brief",
      datum: "4 oktober 2019",
      contactpersoon: "",
      aanhef: "Beste ",
      naam: "Francious",
      groetregel: "Hartelijke groet, ",
      toevoeging: "",
      adres: "Vincent van Goghlaan 64 5246 GB  Rosmalen",
      kenmerk: ""
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

  writeInDocument = () => {
    Office.context.ui.messageParent(
      JSON.stringify({ messageType: "text", data: this.state })
    );
  };

  renderLeftPanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { width: "50%" } }}>
        <TextField
          label="Adres"
          id="adres"
          multiline
          rows={1}
          resizable={false}
          value={this.state.adres}
          onChange={this.textFieldOnChange}
        />
        <TextField
          value={this.state.onderwerp}
          label="Onderwerp"
          id="onderwerp"
          onChange={this.textFieldOnChange}
        />
        <DatePicker placeholder="Selecteer datum" label="Kies een datum" />
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
      </Stack>
    );
  };

  renderRightPanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { width: "50%" } }}>
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
              <PrimaryButton text="OK" onClick={this.writeInDocument} />
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
