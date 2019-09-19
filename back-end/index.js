const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");
const { getSslCert, getSslKey, getEnv } = require("../utils");

const start = async () => {
  const env = getEnv();
  console.log(`Process running with env: ${env}`);
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const server = await https.createServer(
    { key: getSslKey(), cert: getSslCert() },
    app
  );

  app.get("/api/test", (req, res) => {
    res.status(200).send({ message: "OK" });
  });

  app.post("/api/signin", (req, res) => {
    if (req.body.username === "test" && req.body.password === "admin") {
      res.status(200).send({ token: "pizzaboi" });
      return;
    }
    res.status(400).send({ message: "Wrong log in" });
  });
  
  app.put("/api/dialog", (req, res) => {
    res.status(201).send({ message: "CREATED", body: req.body });
  });

  app.use("/", express.static(path.join(__dirname, "public")));
  if (["production"].includes(env)) {
    console.log("Mounting * path as catch-all");
    app.use("/", express.static(path.join(__dirname, "dist")));
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
