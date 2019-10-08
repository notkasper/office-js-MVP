import React from "react";
import { inject, observer } from "mobx-react";
import {
  Text,
  Stack,
  TextField,
  PrimaryButton,
  Dropdown,
  Checkbox
} from "office-ui-fabric-react";
import ProfileList from "./ProfileList";

@inject("exampleFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { exampleFormStore: store } = this.props;
    store.retrieveProfileList(() => {});
  }

  handleFormData(data) {
    const { exampleFormStore: store } = this.props;
    store.sendDialogForm(data, () => {});
  }

  onTextFieldChange = event => {
    const { exampleFormStore: store } = this.props;
    const { id, value } = event.target;
    store[id] = value;
  };

  onCheckboxChange = event => {
    const { exampleFormStore: store } = this.props;
    const { id, checked } = event.target;
    store[id] = checked;
  };

  onDropdownChange = (event, option) => {
    const { exampleFormStore: store } = this.props;
    const { id } = event.target;
    store[id] = option.text;
  };

  render() {
    const { exampleFormStore: store } = this.props;
    return (
      <div>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 15 }}>
          <ProfileList props={this.props} />
          <Stack vertical tokens={{ childrenGap: 5 }}>
            <Stack horizontal tokens={{ childrenGap: 5 }}>
              <Text variant="xLarge">Persoonlijke instellingen</Text>
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 5 }}>
              <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
                <TextField
                  label="Naam (formeel)"
                  id="formal_name"
                  required
                  value={store.formal_name}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
                <TextField
                  label="Naam (informeel)"
                  id="informal_name"
                  value={store.informal_name}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
                <TextField
                  label="Persoonlijk telefoonnummer (10 cijfers)"
                  id="phone_number"
                  value={store.phone_number}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
                <TextField
                  label="Persoonlijk mobielnummer (10 cijfers)"
                  id="mobile_number"
                  value={store.mobile_number}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
              </Stack>
              <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
                <TextField
                  label="Persoonlijk e-mailadres"
                  id="email"
                  value={store.email}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
                <Dropdown
                  placeholder="Selecteer een optie"
                  label="Functie"
                  id="work_function"
                  options={[
                    { key: 0, text: "Assistent procesmanager" },
                    { key: 1, text: "Assistent procesmanager" },
                    { key: 2, text: "Assistent procesmanager" },
                    { key: 3, text: "Assistent procesmanager" },
                    { key: 4, text: "Assistent procesmanager" }
                  ]}
                  value={store.work_function}
                  onChange={(event, option) =>
                    this.onDropdownChange(event, option)
                  }
                  styles={{ dropdown: { width: 300 } }}
                ></Dropdown>
                <Dropdown
                  placeholder="Selecteer een optie"
                  label="Afdeling"
                  id="department"
                  options={[{ key: 0, text: "CZ directie" }]}
                  value={store.department}
                  onChange={(event, option) =>
                    this.onDropdownChange(event, option)
                  }
                  styles={{ dropdown: { width: 300 } }}
                ></Dropdown>
                <Dropdown
                  placeholder="Selecteer een optie"
                  label="Vestiging"
                  id="establishment"
                  value={store.establishment}
                  onChange={(event, option) =>
                    this.onDropdownChange(event, option)
                  }
                  options={[{ key: 0, text: "Factuuradres Haarlem CA" }]}
                  styles={{ dropdown: { width: 300 } }}
                ></Dropdown>
              </Stack>
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
              <Checkbox
                label="Outlook ondertekening genereren"
                id="generate_outlook_signature"
                checked={store.generate_outlook_signature}
                onChange={event => this.onCheckboxChange(event)}
              />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 5 }}>
              <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
                <TextField
                  label="Extra tekst (bijv. Vragen?)"
                  id="extra_text"
                  value={store.extra_text}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
                <TextField
                  label="WhatsApp"
                  id="whatsapp"
                  value={store.whatsapp}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
              </Stack>
              <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
                <TextField
                  label="Werkdagen"
                  id="working_days"
                  value={store.working_days}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
                <TextField
                  label="Openingstijden"
                  id="opening_hours"
                  value={store.opening_hours}
                  onChange={event => this.onTextFieldChange(event)}
                  styles={{ root: { minWidth: 300 } }}
                />
              </Stack>
            </Stack>
            <PrimaryButton
              text="Toevoegen"
              onClick={() => {
                const {
                  formal_name,
                  informal_name,
                  phone_number,
                  mobile_number,
                  email,
                  work_function,
                  department,
                  establishment,
                  generate_outlook_signature,
                  extra_text,
                  whatsapp,
                  working_days,
                  opening_hours
                } = store;

                this.handleFormData({
                  formal_name,
                  informal_name,
                  phone_number,
                  mobile_number,
                  email,
                  work_function,
                  department,
                  establishment,
                  generate_outlook_signature,
                  extra_text,
                  whatsapp,
                  working_days,
                  opening_hours
                });
              }}
            />
          </Stack>
        </Stack>
      </div>
    );
  }
}
