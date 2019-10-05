import React from "react";
import jsCookie from "js-cookie";
import { Text } from "office-ui-fabric-react";

export default class AuthorizedDialog extends React.Component {
  componentDidMount() {
    try {
      const hash = window.location.hash.replace(/^#\/?|\/$/g, "").split("/");
      const accessToken = hash[1];
      const refreshToken = hash[2];
      const expires = parseInt(hash[3]);
      jsCookie.set("accessToken", accessToken, {
        expires: expires / (60 * 60 * 24) // in days
      });
      jsCookie.set("refreshToken", refreshToken, {
        expires: 365 * 20 // in days
      });
      window.close();
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
