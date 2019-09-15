import React from "react";
import { Image, Stack } from "office-ui-fabric-react";

export default class ImageTest extends React.Component {
  render() {
    return (
      <Stack horizontal>
        <Image
          src="/api/assets/pizzaboi.jpg"
          alt="Pizzaboi"
          width={300}
          height={256}
        />
      </Stack>
    );
  }
}
