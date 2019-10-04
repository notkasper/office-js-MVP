const express = require("express");
const {
  acquireTokenWithAuthorizationCode,
  getAuthorizationUrl
} = require("../handlers/auth");
const getUserDetails = require("../handlers/getUserDetails");
const putProfile = require("../handlers/putProfile");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.put("/dialog", (req, res) => {
  res.status(201).send({ message: "CREATED", body: req.body });
});

router.get("/oauth", getAuthorizationUrl);
router.put("/profile", putProfile);
router.get("/getAccessToken", acquireTokenWithAuthorizationCode);

router.get("/getUserDetails", getUserDetails);

module.exports = router;
