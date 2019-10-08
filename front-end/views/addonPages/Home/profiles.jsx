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
    if (!addonStore.profiles.length) {
      this.setState({ loading: true });
      addonStore.getProfiles(() => {
        this.setState({ loading: false });
      });
    }
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

  handleProfileDeleted = () => {
    const { addonStore } = this.props;
    this.setState({ loading: true });
    addonStore.getProfiles(() => {
      this.setState({ loading: false });
    });
  };

  openProfileDialog = id => {
    const height = 60;
    const width = 34;

    Office.context.ui.displayDialogAsync(
      `${window.location.origin}?id=${id}#profile_form`,
      { height, width, displayInIframe: true },
      result => {
        if (result.status !== "succeeded") {
          console.error(
            `Something went wrong while opening the dialog: ${result}`
          );
          return;
        }
        const dialog = result.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, arg => {
          const { messageType } = JSON.parse(arg.message);
          switch (messageType) {
            case "profileDeleted":
              dialog.close();
              this.handleProfileDeleted();
              break;
            default:
              console.error(
                `Received unhandled message from dialog: ${messageType}`
              );
              return;
          }
        });
      }
    );
  };

  renderItemColumn = (item, index, column) => {
    const { fieldName } = column;
    switch (fieldName) {
      case "formal_name":
        return (
          <Stack horizontal tokens={{ childrenGap: "9rem" }}>
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
      <div style={{ padding: "0 .5rem" }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text styles={{ root: { marginTop: "10px" } }}>{`${profiles.length} ${
            profiles.length === 1 ? "profiel" : "profielen"
          } gevonden`}</Text>
          <ActionButton
            iconProps={{ iconName: "AddFriend" }}
            onClick={() => console.log("New profile please.")}
          >
            Nieuw profiel
          </ActionButton>
        </Stack>
        <DetailsList
          items={profiles}
          columns={[
            { key: "profile", name: "Profiel", fieldName: "formal_name" }
          ]}
          onRenderItemColumn={this.renderItemColumn}
          checkboxVisibility={2} // 2 = hidden
        />
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return loading ? this.renderLoading() : this.renderProfiles();
  }
}
