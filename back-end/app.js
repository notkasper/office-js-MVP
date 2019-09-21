const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const api = require("./routes/api");
const { getSslCert, getSslKey, getEnv, getPort } = require("../utils");

const app = express();
const env = getEnv();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

if (["production", "staging"].includes(env)) {
  console.log("Mounting * path as catch-all");
  app.use("/", express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    console.log("Catch-all");
    res.sendFile(path.join(__dirname, "./dist/index.html"));
  });
}

module.exports = app;
