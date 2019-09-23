import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { initializeIcons } from "@uifabric/icons";
import App from "./App";

Office.initialize = () => {
  initializeIcons();
  ReactDOM.render(<App />, document.getElementById("root"));
};
