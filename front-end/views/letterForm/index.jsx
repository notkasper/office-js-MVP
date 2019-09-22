import React from "react";
import { inject, observer } from "mobx-react";
import {
} from "office-ui-fabric-react";

@inject("letterFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (<div><p>Letter form</p></div>
    );
  }
}
