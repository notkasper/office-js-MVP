import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { initializeIcons } from "@uifabric/icons";
import App from "./App";

<<<<<<< HEAD
Office.initialize = () => {
  initializeIcons();
=======
Office.initialize = () => {};
Office.onReady(() => {
  console.log("Office ready!");
>>>>>>> master
  ReactDOM.render(<App />, document.getElementById("root"));
});
