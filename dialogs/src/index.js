import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/user_form_1"
          component={Form1}
        />
        <Route
          exact
          path="/user_form_2"
          component={Form2}
        />
      </BrowserRouter>
    );
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App name="Dialog" />, mountNode);
