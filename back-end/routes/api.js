const express = require("express");
const {
  getProfileList,
  getProfile,
  createProfile,
  adjustProfile,
  deleteProfile
} = require("../handlers/profile");
const {
  acquireTokenWithAuthorizationCode,
  getAuthorizationUrl
} = require("../handlers/auth");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send({ message: "OK" });
});

router.get("/profile", getProfileList);
router.get("/profile/:id", getProfile);
router.put("/profile/:id", adjustProfile);
router.post("/profile", createProfile);
router.delete("/profile/:id", deleteProfile);

router.get("/oauth", getAuthorizationUrl);

router.get("/getAccessToken", acquireTokenWithAuthorizationCode);

module.exports = router;
