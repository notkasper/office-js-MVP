import React from "react";
import { Text, Stack, TextField, PrimaryButton } from "office-ui-fabric-react";
import request from "superagent";

class Form extends React.Component {
  componentDidMount() {
    request
      .get("/api/test")
      .send({ message: "hi server" })
      .end((error, response) => {
        console.log(`error: ${error}\nresponse: ${response}`);
      });
  }

  render() {
    return (
      <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
        <Text>Form 2</Text>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField label="Test veld" />
          <TextField label="Test veld" />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField label="Test veld" />
        </Stack>
        <Stack>
          <PrimaryButton text="Toevoegen" />
        </Stack>
      </Stack>
    );
  }
}

export default Form;
