const express = require("express");
const { getProfileList, createProfile } = require("../handlers/profile");
const {
  acquireTokenWithAuthorizationCode,
  getAuthorizationUrl
} = require("../handlers/auth");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.get("/profile", getProfileList);
router.post("/profile", createProfile);

router.get("/oauth", getAuthorizationUrl);

router.get("/getAccessToken", acquireTokenWithAuthorizationCode);

module.exports = router;
