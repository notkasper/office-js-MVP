import React from "react";
import jsCookie from "js-cookie";
import { Text } from "office-ui-fabric-react";

export default class AuthorizedDialog extends React.Component {
  componentDidMount() {
    try {
      const hash = window.location.hash.replace(/^#\/?|\/$/g, "").split("/");
      const accessToken = hash[1];
      const refreshToken = hash[2];
      jsCookie.set("access_token", accessToken);
      jsCookie.set("refresh_token", refreshToken);
      // window.close();
    } catch (error) {
      console.error(
        `Something went wrong while setting auth cookies: ${error}`
      );
    }
  }

  render() {
    return <Text>Alles is gelukt! Dit venster sluit zichzelf.</Text>;
  }
}
