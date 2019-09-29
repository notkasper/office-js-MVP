/*===========================NODE MODULES======================*/
import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "mobx-react";

/*===========================STORES============================*/
import addonStore from "./stores/addon";
import exampleFormStore from "./stores/exampleForm";
import letterFormStore from "./stores/letterForm";

/*===========================DIALOGS===========================*/
import Form1 from "./views/exampleDialog";
import LetterForm from "./views/letterForm";
import AuthorizedDialog from "./views/authorizedDialog";

/*===========================ADDON COMPONENTS==================*/
import Addon from "./views/addonPages/Home";
import Login from "./views/addonPages/Login";

/*===========================OTHER=============================*/
import { setLocation } from "./utils";

const stores = {
  addonStore,
  exampleFormStore,
  letterFormStore
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
    const authorized = addonStore.checkAuthorized();
    if (authorized) {
      setLocation("home");
      return;
    }
    addonStore.listenToCookieChanges(() => {
      setLocation("home");
    });
  }

  /* NOTE: all content shown in a DIALOG does NOT HAVE ACCESS to any data that has been set/retrieved in the addon e.g. MOBX STORES*/
  getComponent = location => {
    switch (location) {
      /* ADDON PANEL*/
      case "home":
        return <Addon />;
      case "login":
        return <Login />;
      case "page_2":
        return (
          <div>
            <button onClick={() => setLocation("home")}>Go back</button>
          </div>
        );
      /* DIALOGS */
      case "form1":
        return <Form1 />;
      case "letter_form":
        return <LetterForm />;
      case "authorized":
        return <AuthorizedDialog />;
      default:
        return (
          <div>
            <p>{`Page: ${location} could not be found.`}</p>
          </div>
        );
    }
  };

  render() {
    const { location } = this.state;
    return <Provider {...stores}>{this.getComponent(location)}</Provider>;
  }
};

export default hot(App);
