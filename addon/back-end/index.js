const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");
const { getSslCert, getSslKey } = require("../../utils");

const start = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));

  const server = await https.createServer(
    {
      key: getSslKey(),
      cert: getSslCert()
    },
    app
  );

  app.use("/assets", express.static(path.join(__dirname, "public")));

  app.get("/api/test", (req, res) => {
    console.log("/api/test");
    res.status(200).send({ message: "OK" });
  });
  app.get("/test", (req, res) => {
    console.log("/test");
    res.status(200).send({ message: "OK" });
  });

  const port = 3000;
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

start();
