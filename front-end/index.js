import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

Office.initialize = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
