import React from "react";
import { Text, Stack, TextField, PrimaryButton } from "office-ui-fabric-react";

class Form extends React.Component {
  render() {
    return (
      <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
        <Text>Form 1</Text>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField label="Test veld" />
          <TextField label="Test veld" />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 5, padding: 5 }}>
          <TextField label="Test veld" />
          <TextField label="Test veld" />
          <TextField label="Test veld" />
        </Stack>
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
