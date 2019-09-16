/*===========================NODE MODULES======================*/
import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";

/*===========================STORES============================*/
import addonStore from "./stores/addon";
import exampleFormStore from "./stores/exampleForm";

/*===========================DIALOGS===========================*/
import Form1 from "./exampleDialog";

/*===========================ADDON COMPONENTS==================*/
import Addon from "./addonComponents/index";
import LoginPage from "./addonComponents/LoginPage";

const stores = {
  addonStore,
  exampleFormStore
};

const App = class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <BrowserRouter>
          <Route exact path="/login" component={Addon} />
          <Route exact path="/form1" component={Form1} />
        </BrowserRouter>
      </Provider>
    );
  }
};

export default hot(App);
