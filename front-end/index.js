import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

Office.initialize = () => {};
Office.onReady(() => {
  console.log("Office ready!");
  ReactDOM.render(<App />, document.getElementById("root"));
});
