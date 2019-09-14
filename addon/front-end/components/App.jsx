import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "mobx-react";
import applicationStore from "../stores/application";
import DialogButton from "./DialogButton";
import ApiTest from "./ApiTest";
import StoreTest from "./StoreTest";
import ImageTest from "./ImageTest";

const stores = {
  application: applicationStore
};

const App = class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <DialogButton />
        <ApiTest />
        <StoreTest />
        <ImageTest />
      </Provider>
    );
  }
};

export default hot(App);
