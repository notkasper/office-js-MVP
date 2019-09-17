import React from "react";
import TestComponent from "./TestComponent";
import LoginPage from "./LoginPage";
import { inject, observer } from "mobx-react";

@inject("addonStore")
@observer
export default class TestComponents extends React.Component {
  render() {
    const { addonStore } = this.props;
    const route = addonStore.route;
    switch (route) {
      case "login":
        return <LoginPage />;
      case "home":
        return <TestComponent />;
      case "page_2":
        return (
          <div>
            <p>This is page 2</p>
            <button onClick={() => addonStore.setRoute("home")}>
              Go to page 1
            </button>
          </div>
        );
    }
  }
}
