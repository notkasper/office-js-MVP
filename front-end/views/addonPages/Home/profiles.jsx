import React from "react";
import { inject, observer } from "mobx-react";
import {
  DetailsList,
  ShimmeredDetailsList,
  ActionButton
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

  renderItemColumn = (item, index, column) => {
    const { fieldName } = column;
    switch (fieldName) {
      case "formal_name":
        return item.formal_name;
      case "details":
        return (
          <ActionButton
            styles={{
              root: {
                padding: 0,
                margin: 0
              }
            }}
            iconProps={{ iconName: "ListMirrored" }}
          >
            Details
          </ActionButton>
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
          { key: "profile", name: "Profiel", fieldName: "formal_name" },
          { key: "details", name: "Details", fieldName: "details" }
        ]}
        onRenderItemColumn={this.renderItemColumn}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return loading ? this.renderLoading() : this.renderProfiles();
  }
}
