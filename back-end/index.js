const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");
const { getSslCert, getSslKey } = require("../utils");

const start = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const server = await https.createServer(
    {
      key: getSslKey(),
      cert: getSslCert()
    },
    app
  );

  app.use("/assets", express.static(path.join(__dirname, "public")));

  app.get("/test", (req, res) => {
    console.log("/test");
    res.status(200).send({ message: "OK" });
  });

  app.post("/signin", (req, res) => {
    console.log(req.body);
    if (req.body.username === "test" && req.body.password === "admin") {
      res.status(200).send({ token: "pizzaboi" });
      return;
    }
    res.status(400).send({ message: "Wrong log in" });
  });

  const port = 3000;
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

start();
