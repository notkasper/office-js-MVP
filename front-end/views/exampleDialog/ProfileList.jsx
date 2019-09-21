import React from "react";
import { Stack, List, PrimaryButton, Text } from "office-ui-fabric-react";

export default class ProfileList extends React.Component {
  render() {
    return (
      <Stack vertical tokens={{ childrenGap: 5 }}>
        <div style={{ paddingRight: 50 }}>
          <Text variant="xLarge">Profielen</Text>
          <div
            data-is-scrollable="true"
            style={{
              overflow: "auto",
              maxHeight: "500px",
              marginTop: "20px"
            }}
          >
            <List
              items={[{ name: "Foo" }, { name: "Bar" }]}
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
