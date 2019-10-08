import React from "react";
import { inject, observer } from "mobx-react";
import {
  DetailsList,
  ShimmeredDetailsList,
  ActionButton,
  Text,
  Stack
} from "office-ui-fabric-react";

@inject("addonStore")
@observer
export default class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    const { addonStore } = this.props;
    this.setState({ loading: true });
    addonStore.getProfiles(() => {
      console.log("done loading");
      this.setState({ loading: false });
    });
  }

  renderLoading = () => {
    return <ShimmeredDetailsList items={[]} />;
  };

  openDialog = (dialogName, width, height, callback) => {
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/#${dialogName}`,
      { height, width, displayInIframe: true },
      result => {
        if (result.status !== "succeeded") {
          console.error(
            `Something went wrong while opening the dialog: ${JSON.stringify(
              result
            )}`
          );
          callback(true);
          return;
        }
        callback(false, result.value);
      }
    );
  };

  openProfileDialog = id => {
    console.log(`Open profile dialog for ${id}`);
    this.openDialog("profile_form", 48, 60, (error, dialog) => {
      if (error) {
        return;
      }
      dialog.addEventHandler(
        Office.EventType.DialogMessageReceived,
        message => {
          console.log(`Message received: ${message}`);
        }
      );
    });
  };

  renderItemColumn = (item, index, column) => {
    const { fieldName } = column;
    switch (fieldName) {
      case "formal_name":
        return (
          <Stack horizontal tokens={{ childrenGap: "10rem" }}>
            <Text>{item.formal_name}</Text>
            <ActionButton
              iconProps={{ iconName: "ListMirrored" }}
              onClick={() => this.openProfileDialog(item.id)}
            >
              Details
            </ActionButton>
          </Stack>
        );
    }
    return null;
  };

  renderProfiles = () => {
    const { addonStore } = this.props;
    const profiles = addonStore.profiles;
    return (
      <DetailsList
        items={profiles}
        columns={[
          { key: "profile", name: "Profiel", fieldName: "formal_name" }
        ]}
        onRenderItemColumn={this.renderItemColumn}
        checkboxVisibility={2} // 2 = hidden
      />
    );
  };

  render() {
    const { loading } = this.state;
    return loading ? this.renderLoading() : this.renderProfiles();
  }
}
