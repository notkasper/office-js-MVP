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
    minHeight: "25rem",
    maxHeight: "25rem"
  }
};

const profileListColumns = [
  {
    key: "profile",
    name: "Profiel",
    fieldName: "profiel",
    minWidth: 200,
    maxWidth: 200,
    isResizable: false
  }
];
@inject("exampleFormStore")
@observer
export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
  }

  onRowClick = (item, index, event) => {
    const { exampleFormStore: store } = this.props;
    const { key } = item;

    store.retrieveProfile(key, (error, response) => {
      const {
        body: {
          uuid,
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
        }
      } = response;

      store.selected_profile_id = uuid;
      store.formal_name = formal_name;
      store.informal_name = informal_name;
      store.phone_number = phone_number;
      store.mobile_number = mobile_number;
      store.email = email;
      store.work_function = work_function;
      store.department = department;
      store.establishment = establishment;
      store.generate_outlook_signature = generate_outlook_signature;
      store.extra_text = extra_text;
      store.whatsapp = whatsapp;
      store.working_days = working_days;
      store.opening_hours = opening_hours;
    });
  };

  render() {
    const { exampleFormStore: store } = this.props;

    return (
      <Stack vertical tokens={{ childrenGap: 5 }}>
        <Text variant="xLarge">Profielen</Text>
        <DetailsList
          checkboxVisibility={2}
          columns={profileListColumns}
          styles={{ root: styles.list }}
          onActiveItemChanged={this.onRowClick}
          items={store.profile_items.map(item => ({
            key: item.uuid,
            profiel: item.formal_name
          }))}
        ></DetailsList>
        <PrimaryButton text="Nieuw profiel"></PrimaryButton>
        <PrimaryButton text="Kopie"></PrimaryButton>
        <PrimaryButton
          text="Wissen"
          onClick={store.deleteProfile}
        ></PrimaryButton>
        <PrimaryButton text="Instellen als standaard profiel"></PrimaryButton>
      </Stack>
    );
  }
}
