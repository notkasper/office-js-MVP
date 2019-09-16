import React from "react";
import { inject, observer } from "mobx-react";
import {
  Text,
  Stack,
  TextField,
  PrimaryButton,
  Dropdown
} from "office-ui-fabric-react";
import ProfileList from "./ProfileList";

@inject("exampleFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      surname: "",
      address: "",
      house_number: "",
      city: "",
      phone_number: "",
      mobile_number: "",
      email: ""
    };
  }

  handleFormData(data) {
    const { exampleFormStore } = this.props;
    exampleFormStore.sendDialogForm(data, () => {});
  }

  render() {
    return (
      <div>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 15 }}>
          <ProfileList />
          <Stack vertical tokens={{ childrenGap: 5 }}>
            <Stack horizontal tokens={{ childrenGap: 5 }}>
              <Text variant="xLarge">Persoonlijke instellingen</Text>
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 5 }}>
              <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
                <TextField
                  label="Naam (formeel)"
                  required
                  value={this.state.firstname}
                  onChange={event =>
                    this.setState({ firstname: event.target.value })
                  }
                  styles={{ root: { minWidth: "220px" } }}
                />
                <TextField
                  label="Naam (informeel)"
                  value={this.state.surname}
                  onChange={event =>
                    this.setState({ surname: event.target.value })
                  }
                  styles={{ root: { minWidth: "220px" } }}
                />
                <TextField
                  label="Persoonlijk telefoonnummer (10 cijfers)"
                  value={this.state.address}
                  onChange={event =>
                    this.setState({ address: event.target.value })
                  }
                  styles={{ root: { minWidth: "220px" } }}
                />
                <TextField
                  label="Persoonlijk mobielnummer (10 cijfers)"
                  value={this.state.house_number}
                  onChange={event =>
                    this.setState({ house_number: event.target.value })
                  }
                  styles={{ root: { minWidth: "220px" } }}
                />
              </Stack>
              <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
                <TextField
                  label="Persoonlijk e-mailadres"
                  value={this.state.city}
                  onChange={event =>
                    this.setState({ city: event.target.value })
                  }
                  styles={{ root: { minWidth: "220px" } }}
                />
                <Dropdown
                  placeholder="Selecteer een optie"
                  label="Functie"
                  options={[{ key: 0, text: "Assistent procesmanager" }]}
                  styles={{ dropdown: { width: 300 } }}
                ></Dropdown>
                <Dropdown
                  placeholder="Selecteer een optie"
                  label="Afdeling"
                  options={[{ key: 0, text: "CZ directie" }]}
                  styles={{ dropdown: { width: 300 } }}
                ></Dropdown>
                <Dropdown
                  placeholder="Selecteer een optie"
                  label="Vestiging"
                  options={[{ key: 0, text: "Factuuradres Haarlem CA" }]}
                  styles={{ dropdown: { width: 300 } }}
                ></Dropdown>
              </Stack>
            </Stack>
            <PrimaryButton
              text="Toevoegen"
              onClick={() => {
                const {
                  firstname,
                  surname,
                  address,
                  house_number,
                  city,
                  phone_number,
                  mobile_number,
                  email
                } = this.state;

                this.handleFormData({
                  firstname,
                  surname,
                  address,
                  house_number,
                  city,
                  phone_number,
                  mobile_number,
                  email
                });
              }}
            />
          </Stack>
        </Stack>
      </div>
    );
  }
}
