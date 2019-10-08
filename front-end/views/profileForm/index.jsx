import React from "react";
import { inject, observer } from "mobx-react";
import {
  Text,
  Stack,
  TextField,
  ActionButton,
  Dropdown,
  PrimaryButton,
  Checkbox
} from "office-ui-fabric-react";

@inject("profileFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formal_name: "",
      informal_name: "",
      phone_number: "",
      mobile_number: "",
      email: "",
      work_function: "",
      department: "",
      establishment: "",
      generate_outlook_signature: false,
      extra_text: "",
      whatsapp: "",
      working_days: "",
      opening_hours: "",
      editing: false
    };
  }

  handleFormData(data) {
    const { profileFormStore } = this.props;
    profileFormStore.putProfile(data, () => {});
  }

  enableEditing = () => {
    this.setState({ editing: true });
  };

  saveEdit = () => {
    this.setState({ editing: false });
    // update profile from here
  };

  render() {
    const { editing } = this.state;
    return (
      <div>
        <Stack vertical tokens={{ childrenGap: 5 }}>
          <Stack horizontal horizontalAlign="space-between">
            <Text variant="xLarge">Persoonlijke instellingen</Text>
            {editing ? null : (
              <ActionButton
                iconProps={{ iconName: "EditContact" }}
                onClick={this.enableEditing}
              >
                Aanpassen
              </ActionButton>
            )}
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
              <TextField
                label="Naam (formeel)"
                required
                value={this.state.formal_name}
                onChange={event =>
                  this.setState({ formal_name: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
              <TextField
                label="Naam (informeel)"
                value={this.state.informal_name}
                onChange={event =>
                  this.setState({ informal_name: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
              <TextField
                label="Persoonlijk telefoonnummer (10 cijfers)"
                value={this.state.phone_number}
                onChange={event =>
                  this.setState({ phone_number: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
              <TextField
                label="Persoonlijk mobielnummer (10 cijfers)"
                value={this.state.mobile_number}
                onChange={event =>
                  this.setState({ mobile_number: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
            </Stack>
            <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
              <TextField
                label="Persoonlijk e-mailadres"
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
              <Dropdown
                placeholder="Selecteer een optie"
                label="Functie"
                options={[
                  { key: 0, text: "Assistent procesmanager" },
                  { key: 1, text: "Assistent procesmanager" },
                  { key: 2, text: "Assistent procesmanager" },
                  { key: 3, text: "Assistent procesmanager" },
                  { key: 4, text: "Assistent procesmanager" }
                ]}
                onChange={(event, option) => {
                  this.setState({ work_function: option.text });
                }}
                styles={{ dropdown: { width: 300 } }}
                disabled={!editing}
              ></Dropdown>
              <Dropdown
                placeholder="Selecteer een optie"
                label="Afdeling"
                options={[{ key: 0, text: "CZ directie" }]}
                value={this.state.department}
                onChange={(event, option) => {
                  this.setState({ department: option.text });
                }}
                styles={{ dropdown: { width: 300 } }}
                disabled={!editing}
              ></Dropdown>
              <Dropdown
                placeholder="Selecteer een optie"
                label="Vestiging"
                value={this.state.establishment}
                onChange={(event, option) => {
                  this.setState({ establishment: option.text });
                }}
                options={[{ key: 0, text: "Factuuradres Haarlem CA" }]}
                styles={{ dropdown: { width: 300 } }}
                disabled={!editing}
              ></Dropdown>
            </Stack>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
            <Checkbox
              label="Outlook ondertekening genereren"
              checked={this.state.generate_outlook_signature}
              onChange={event =>
                this.setState({
                  generate_outlook_signature: event.target.checked
                })
              }
              disabled={!editing}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
              <TextField
                label="Extra tekst (bijv. Vragen?)"
                value={this.state.extra_text}
                onChange={event =>
                  this.setState({ extra_text: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
              <TextField
                label="WhatsApp"
                value={this.state.whatsapp}
                onChange={event =>
                  this.setState({ whatsapp: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
            </Stack>
            <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
              <TextField
                label="Werkdagen"
                value={this.state.working_days}
                onChange={event =>
                  this.setState({ working_days: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
              <TextField
                label="Openingstijden"
                value={this.state.opening_hours}
                onChange={event =>
                  this.setState({ opening_hours: event.target.value })
                }
                styles={{ root: { minWidth: 300 } }}
                disabled={!editing}
              />
            </Stack>
          </Stack>
          {editing ? (
            <PrimaryButton text="Aanpassing opslaan" onClick={this.saveEdit} />
          ) : null}
        </Stack>
      </div>
    );
  }
}
