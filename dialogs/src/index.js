import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/Form";
import "./styles.css";

class App extends React.Component {
  render() {
    return <Form />;
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App name="Dialog" />, mountNode);
