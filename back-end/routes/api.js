const express = require("express");
const {
  acquireTokenWithAuthorizationCode,
  getAuthorizationUrl
} = require("../handlers/auth");
const getProfile = require("../handlers/getProfile");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.put("/dialog", (req, res) => {
  res.status(201).send({ message: "CREATED", body: req.body });
});

router.get("/oauth", getAuthorizationUrl);
router.get("/getAccessToken", acquireTokenWithAuthorizationCode);

router.get("/getProfile", getProfile);

module.exports = router;
