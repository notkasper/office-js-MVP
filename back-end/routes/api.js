const fs = require("fs");
const path = require("path");
const express = require("express");
const auth = require("../handlers/auth");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.put("/dialog", (req, res) => {
  res.status(201).send({ message: "CREATED", body: req.body });
});

router.post("/oauth", auth.start);

router.get("/getAccessToken", auth.handle);


module.exports = router;
