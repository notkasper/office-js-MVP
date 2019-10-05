import React from "react";
import { inject, observer } from "mobx-react";
import {
  Stack,
  DetailsList,
  PrimaryButton,
  Text
} from "office-ui-fabric-react";

const styles = {
  list: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 500,
    maxHeight: 500
  }
};
@inject("profileFormStore")
@observer
export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profileFormStore } = this.props;
    return (
      <Stack vertical tokens={{ childrenGap: 5 }}>
        <Text variant="xLarge">Profielen</Text>
        <DetailsList
          checkboxVisibility={2}
          columns={[
            {
              key: "profile",
              name: "Profiel",
              fieldName: "profiel",
              minWidth: 200,
              maxWidth: 200,
              isResizable: false
            }
          ]}
          items={profileFormStore.profiles.map(item => ({
            profiel: item.formal_name
          }))}
          styles={{ root: styles.list }}
        ></DetailsList>
        <PrimaryButton text="Nieuw profiel"></PrimaryButton>
        <PrimaryButton text="Kopie"></PrimaryButton>
        <PrimaryButton text="Wissen"></PrimaryButton>
        <PrimaryButton text="Instellen als standaard profiel"></PrimaryButton>
      </Stack>
    );
  }
}