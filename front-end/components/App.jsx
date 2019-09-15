import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";
import applicationStore from "../stores/application";
import DialogButton from "./DialogButton";
import ApiTest from "./ApiTest";
import StoreTest from "./StoreTest";
import ImageTest from "./ImageTest";
import Form1 from "./dialogs/Form1";

const stores = {
  application: applicationStore
};

const Test = class Test extends React.Component {
  render() {
    return (
      <div>
        <DialogButton />
        <ApiTest />
        <StoreTest />
        <ImageTest />
      </div>
    );
  }
};

const App = class App extends React.Component {

  render() {

    console.log(window.location)
    return (
      <Provider {...stores}>
        <BrowserRouter>
          <Route exact path="/home" component={Test} />
          <Route exact path="/form1" component={Form1} />
        </BrowserRouter>
      </Provider>
    );
  }
};

export default hot(App);
