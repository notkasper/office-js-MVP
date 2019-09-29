import React from "react";
import { Text } from "office-ui-fabric-react";

export default class AuthorizedDialog extends React.Component {
  componentDidMount() {
    window.close();
  }

  render() {
    return <Text>Alles is gelukt! Dit venster sluit zichzelf.</Text>;
  }
}
