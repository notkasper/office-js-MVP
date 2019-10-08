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
      this.loadProfiles();
    }
  }

  loadProfiles = () => {
    const { addonStore } = this.props;
    this.setState({ loading: true });
    addonStore.getProfiles(() => {
      this.setState({ loading: false });
    });
  };

  handleProfileDeleted = () => {
    this.loadProfiles();
  };

  handleProfileCreated = () => {
    this.loadProfiles();
  };

  openProfileDialog = (action, id) => {
    const height = 63;
    const width = 34;

    Office.context.ui.displayDialogAsync(
      `${window.location.origin}?action=${action}&id=${id}#profile_form`,
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
            case "profileCreated":
              dialog.close();
              this.handleProfileDeleted();
              break;
            case "close":
              dialog.close();
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
            <Text styles={{ root: { minWidth: "3.5rem" } }}>
              {item.formal_name.substring(0, 20)}
            </Text>
            <ActionButton
              iconProps={{ iconName: "ListMirrored" }}
              onClick={() => this.openProfileDialog("view", item.id)}
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
          <Text styles={{ root: { marginTop: "10px", paddingLeft: ".3rem" } }}>{`${profiles.length} ${
            profiles.length === 1 ? "profiel" : "profielen"
          } gevonden`}</Text>
          <ActionButton
            iconProps={{ iconName: "AddFriend" }}
            onClick={() => this.openProfileDialog("create")}
          >
            Nieuw profiel
          </ActionButton>
        </Stack>
        <DetailsList
          items={profiles}
          columns={[
            { key: "profile", name: "Profielen", fieldName: "formal_name" }
          ]}
          onRenderItemColumn={this.renderItemColumn}
          checkboxVisibility={2} // 2 = hidden
        />
      </div>
    );
  };

  renderLoading = () => {
    return <ShimmeredDetailsList items={[]} />;
  };

  render() {
    const { loading } = this.state;
    return loading ? this.renderLoading() : this.renderProfiles();
  }
}
