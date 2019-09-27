const fs = require("fs");
const path = require("path");
const express = require("express");
const auth = require("../handlers/auth");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.post("/signin", (req, res) => {
  let accounts;
  try {
    accounts = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../accounts.json"))
    );
  } catch (error) {
    throw new Error(`Error while reading accounts from file: ${error}`);
  }
  const username = req.body.username;
  if (!username) {
    res.status(400).send({ message: "Please provide a username" });
  }
  const user = accounts[username];
  if (req.body.password === user.password) {
    res.status(200).send();
    return;
  }
  res.status(400).send({ message: "Wrong log in" });
});

router.put("/dialog", (req, res) => {
  res.status(201).send({ message: "CREATED", body: req.body });
});

router.post("/oauth", auth.start);

router.get("/getAccessToken", auth.handle);


module.exports = router;
