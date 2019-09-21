/*===========================NODE MODULES======================*/
import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "mobx-react";
import { initializeIcons } from "@uifabric/icons";

/*===========================STORES============================*/
import addonStore from "./stores/addon";
import exampleFormStore from "./stores/exampleForm";

/*===========================DIALOGS===========================*/
import Form1 from "./views/exampleDialog";

/*===========================ADDON COMPONENTS==================*/
import Addon from "./views/addonPages/Home";
import LoginPage from "./views/addonPages/Login";

/*===========================OTHER=============================*/
import { setLocation } from "./utils";

initializeIcons();

const stores = {
  addonStore,
  exampleFormStore
};

const App = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }

  componentDidMount() {
    const handleHashChange = () => {
      const location = window.location.hash
        .replace(/^#\/?|\/$/g, "")
        .split("/")[0];
      this.setState({ location });
    };
    window.onhashchange = handleHashChange;
    handleHashChange();
  }

  /* NOTE: all content shown in a DIALOG does NOT HAVE ACCESS to any data that has been set/retrieved in the addon e.g. MOBX STORES*/
  getComponent = location => {
    switch (location) {
      /* ADDON PANEL*/
      case "home":
        return <Addon />;
      case "page_2":
        return (
          <div>
            <button onClick={() => setLocation("home")}>Go back</button>
          </div>
        );
      case "login":
        return <LoginPage />;
      /* DIALOGS */
      case "form1":
        return <Form1 />;
    }
  };

  render() {
    const { location } = this.state;
    console.log(`Render app on location: ${location}`);
    return <Provider {...stores}>{this.getComponent(location)}</Provider>;
  }
};

export default hot(App);
