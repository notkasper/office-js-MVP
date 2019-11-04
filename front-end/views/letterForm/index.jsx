import React from 'react';
import { inject, observer } from 'mobx-react';
import { Stack, Dropdown, TextField, Icon, Separator, DatePicker, Text, DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

@inject('letterFormStore')
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: new Date(),
      contactpersoon: '',
      aanhef: null,
      voornaam: '',
      achternaam: '',
      groetOptie: '',
      postcode: '',
      straatnaam: '',
      huisnummer: null,
      plaatsnaam: ''
    };
  }

  componentDidMount() {
    const { letterFormStore } = this.props;
    letterFormStore.getProfiles();
    letterFormStore.getAanhefs();
    letterFormStore.getGroetOpties();
  }

  textFieldOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  dropDownOnChange = (event, option) => {
    console.log(event.target.id, option.key);
    this.setState({ [event.target.id]: option.key });
  };

  dateOnSelect = newDate => {
    this.setState({ datum: newDate });
  };

  closeDialog = () => {
    Office.context.ui.messageParent(JSON.stringify({ messageType: 'closeDialog' }));
  };

  createLetter = () => {
    const { letterFormStore } = this.props;
    const data = {
      datum: this.state.datum,
      contactpersoon: this.state.contactpersoon,
      aanhef: (letterFormStore.aanhefs.find(aanhef => aanhef.id === this.state.aanhef) || {}).name,
      voornaam: this.state.voornaam,
      achternaam: this.state.achternaam,
      groetOptie: (letterFormStore.groetOpties.find(groetOptie => groetOptie.id === this.state.groetOptie) || {}).name,
      postcode: this.state.postcode,
      straatnaam: this.state.straatnaam,
      huisnummer: this.state.huisnummer,
      plaatsnaam: this.state.plaatsnaam
    };
    Office.context.ui.messageParent(JSON.stringify({ messageType: 'createLetter', data }));
  };

  renderMainpanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { padding: '0 .3em' } }}>
        <Stack horizontal tokens={{ childrenGap: '1em' }}>
          <TextField
            value={this.state.straatnaam}
            label="Straatnaam"
            id="straatnaam"
            styles={{ root: { width: '50%' } }}
            onChange={this.textFieldOnChange}
          />
          <TextField
            value={this.state.huisnummer}
            label="Huisnummer"
            id="huisnummer"
            onChange={this.textFieldOnChange}
            styles={{ root: { width: '50%' } }}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: '1em' }}>
          <TextField
            label="Plaatsnaam"
            id="plaatsnaam"
            value={this.state.plaatsnaam}
            onChange={this.textFieldOnChange}
            styles={{ root: { width: '50%' } }}
          />
          <TextField
            label="Postcode"
            id="postcode"
            value={this.state.postcode}
            onChange={this.textFieldOnChange}
            styles={{ root: { width: '50%' } }}
          />
        </Stack>
        <DatePicker value={this.state.datum} placeholder="Selecteer datum" label="Datum" id="datum" onSelectDate={this.dateOnSelect} />
        <Stack horizontal tokens={{ childrenGap: '1em' }}>
          <Dropdown
            label="Aanhef"
            id="aanhef"
            options={letterFormStore.aanhefs.map(aanhef => ({
              key: aanhef.id,
              text: aanhef.name
            }))}
            placeHolder="Selecteer aanhef"
            onChange={this.dropDownOnChange}
            styles={{ root: { width: '25%' } }}
          />
          <TextField
            value={this.state.voornaam}
            label="Voornaam"
            id="voornaam"
            onChange={this.textFieldOnChange}
            styles={{ root: { width: '37.5%' } }}
          />
          <TextField
            value={this.state.achternaam}
            label="Achternaam"
            id="achternaam"
            onChange={this.textFieldOnChange}
            styles={{ root: { width: '37.5%' } }}
          />
        </Stack>
        <Dropdown
          label="Groetregel"
          id="groetOptie"
          placeholder="Selecteer groet optie"
          options={letterFormStore.groetOpties.map(groetOptie => ({
            key: groetOptie.id,
            text: groetOptie.name
          }))}
          onChange={this.dropDownOnChange}
        />
        <Dropdown
          label="Contactpersoon"
          id="contactpersoon"
          placeholder={this.state.contactpersoon}
          options={letterFormStore.contacts.map(contact => ({ key: contact.id, text: contact.formal_name }))}
          onChange={this.dropDownOnChange}
          disabled={false}
        />
      </Stack>
    );
  };

  renderHeader = () => {
    return (
      <Stack vertical tokens={{ childrenGap: '.3em' }}>
        <Stack horizontal>
          <Icon iconName="TextDocument" styles={{ root: { fontSize: '3em', color: 'DodgerBlue' } }} />
          <Text variant="xxLarge" styles={{ root: { color: 'DodgerBlue', paddingLeft: '.3em' } }}>
            Brief
          </Text>
        </Stack>
        <Separator />
      </Stack>
    );
  };

  renderFooter = () => {
    return (
      <Stack vertical tokens={{ childrenGap: '.3em' }}>
        <Separator />
        <Stack>
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: '8px' }}>
              <PrimaryButton text="OK" onClick={this.createLetter} />
              <DefaultButton text="Annuleren" onClick={this.closeDialog} styles={{ paddingLeft: '30px' }} />
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
