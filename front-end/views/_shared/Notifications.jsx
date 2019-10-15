import React from "react";
import { inject, observer } from "mobx-react";
import { Text, MessageBar, MessageBarType } from "office-ui-fabric-react";

@inject("notificationStore")
@observer
export default class Notifications extends React.Component {

  render() {
    const { notificationStore } = this.props;
    const message = notificationStore.message;
    return (
      message ? <MessageBar
        messageBarType={MessageBarType.error}
        styles={{ root: { position: "absolute", bottom: 0, left: 0 } }}
      >
        <Text>
          {message}
        </Text>
      </MessageBar> : null
    );
  }
}
