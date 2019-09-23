import React from "react";
import { Stack, List, PrimaryButton, Text } from "office-ui-fabric-react";

export default class ProfileList extends React.Component {
  render() {
    return (
      <Stack vertical tokens={{ childrenGap: 5 }}>
        <div style={{ paddingRight: 50 }}>
          <Text variant="xLarge">Profielen</Text>
          <div>
            <List
              items={[
                { name: "Dennis den Hollander" },
                { name: "Kasper Karelse" },
                { name: "Leon Driessen" }
              ]}
              style={{ height: "400px" }}
            ></List>
          </div>
        </div>
        <PrimaryButton text="Nieuw profiel"></PrimaryButton>
        <PrimaryButton text="Kopie"></PrimaryButton>
        <PrimaryButton text="Wissen"></PrimaryButton>
        <PrimaryButton text="Instellen als standaard profiel"></PrimaryButton>
      </Stack>
    );
  }
}
