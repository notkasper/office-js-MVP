import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { initializeIcons } from "@uifabric/icons";
import App from "./App";

Office.initialize = () => {};

Office.onReady(() => {
  console.log("Office ready!");
  initializeIcons();
  ReactDOM.render(<App />, document.getElementById("root"));
});
