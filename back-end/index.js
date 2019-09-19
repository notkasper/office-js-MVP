const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");
const { getSslCert, getSslKey, getEnv } = require("../utils");

const start = async () => {
  const env = getEnv();
  console.log(`Process running with env: ${env}`);

  const app = express();
  const server = await https.createServer(
    {
      key: getSslKey(),
      cert: getSslCert()
    },
    app
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/assets", express.static(path.join(__dirname, "public")));

  app.get("/test", (req, res) => {
    console.log("/test");
    res.status(200).send({ message: "OK" });
  });

  if (!["development"].includes(env)) {
    console.log("Mounting * path as catch-all");
    app.get('*', (req, res) => {
      console.log("Catch-all");
      res.sendFile(path.join(__dirname, "./dist/index.html"));
    });
  }

  const port = 3000;
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

start();
