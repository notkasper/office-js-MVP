import React from "react";
import { Image, Stack } from "office-ui-fabric-react";
import pizzaBoi from "../../assets/pizzaboi.jpg"

export default class ImageTest extends React.Component {
  render() {
    return (
      <Stack horizontal>
        <Image
          src={pizzaBoi}
          alt="Pizzaboi"
          width={300}
          height={256}
        />
      </Stack>
    );
  }
}
