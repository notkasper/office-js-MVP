const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const http = require("http");
const path = require("path");
const { getSslCert, getSslKey, getEnv, getPort } = require("../utils");

const start = async () => {
  const env = getEnv();
  const port = process.env.PORT || getPort();
  console.log(`Process running with env: ${env} on port: ${port}`);
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  let server;
  if (["production"].includes(env)) {
    /* Azure takes care of https in production */
    server = await http.createServer(app);
  } else {
    /* For testing locally, use key and cert to achieve https */
    server = await https.createServer(
      { key: getSslKey(), cert: getSslCert() },
      app
    );
  }

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

  if (["production", "staging"].includes(env)) {
    console.log("Mounting * path as catch-all");
    app.use("/", express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      console.log("Catch-all");
      res.sendFile(path.join(__dirname, "./dist/index.html"));
    });
  }

  server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

start();
