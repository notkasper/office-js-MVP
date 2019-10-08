const express = require("express");
const {
  acquireTokenWithAuthorizationCode,
  getAuthorizationUrl,
  authMiddleware
} = require("../handlers/auth");
const getUserDetails = require("../handlers/getUserDetails");
const putProfile = require("../handlers/putProfile");
const getProfiles = require("../handlers/getProfiles");
const deleteProfile = require("../handlers/deleteProfile");
const updateProfile = require("../handlers/updateProfile");

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
router.post("/profile", authMiddleware, putProfile);
router.put("/profile/:profile_id", authMiddleware, updateProfile);
router.get("/profiles", authMiddleware, getProfiles);
router.get("/getUserDetails", authMiddleware, getUserDetails);
router.delete("/profile/:profile_id", authMiddleware, deleteProfile);

module.exports = router;
