import React from "react";
import request from "superagent";
import { Text, Stack, TextField, PrimaryButton } from "office-ui-fabric-react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surname: '',
      lastname: '',
      address: '',
      house_number: '',
      city: '',
      phone_number: '',
      mobile_number: '',
      email: '',
    }
  }

  render() {
    return (
      <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
        <Text>Form 1</Text>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField 
            label="Voornaam" 
            value={this.state.surname}
            onChange={(event) => this.setState({ surname: event.target.value })}
          />
          <TextField 
            label="Achternaam"
            value={this.state.lastname}
            onChange={(event) => this.setState({ lastname: event.target.value })}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField 
            label="Adres"
            value={this.state.address}
            onChange={(event) => this.setState({ address: event.target.value })}
          />
          <TextField 
            label="Huisnummer"
            value={this.state.house_number}
            onChange={(event) => this.setState({ house_number: event.target.value })}
          />
          <TextField 
            label="Woonplaats"
            value={this.state.city}
            onChange={(event) => this.setState({ city: event.target.value })}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField 
            label="Persoonlijk telefoonnummer"
            value={this.state.phone_number}
            onChange={(event) => this.setState({ phone_number: event.target.value })}
          />
          <TextField 
            label="Persoonlijk mobielnummer"
            value={this.state.mobile_number}
            onChange={(event) => this.setState({ mobile_number: event.target.value })}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField 
            label="Emailadres"
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </Stack>
        <Stack>
          <PrimaryButton 
            text="Toevoegen" 
            onClick={() => {
              request
                .put('/api/dialog')
                .send({
                  surname: this.state.surname,
                })      
                .end((error, response) => {
                  console.log(`error: ${error}\nresponse: ${response}`);
                });
            }} 
          />
        </Stack>
      </Stack>
    );
  }
}
