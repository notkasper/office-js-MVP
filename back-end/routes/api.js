const express = require("express");
const {
  acquireTokenWithAuthorizationCode,
  getAuthorizationUrl,
  authMiddleware
} = require("../handlers/auth");
const getUserDetails = require("../handlers/getUserDetails");
const putProfile = require("../handlers/putProfile");
const getProfiles = require("../handlers/getProfiles");

const router = express.Router();

/* OPEN */
router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});
router.put("/dialog", (req, res) => {
  res.status(201).send({ message: "CREATED", body: req.body });
});
router.get("/oauth", getAuthorizationUrl);
router.get("/getAccessToken", acquireTokenWithAuthorizationCode);

/* AUTHORIZED */
router.put("/profile", authMiddleware, putProfile);
router.get("/getUserDetails", authMiddleware, getUserDetails);
router.get("/profiles", authMiddleware, getProfiles);

module.exports = router;
