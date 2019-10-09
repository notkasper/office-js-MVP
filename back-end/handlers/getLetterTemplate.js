const _ = require("lodash");
const msgraph = require("../msgraph");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  const accessToken = _.get(req, "cookies.accessToken");
  if (!accessToken) {
    res.status(400).send({ message: "Access token niet meegestuurd." });
  }

  try {
    await msgraph.getUserDetails(accessToken);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Er is iets fout gegaan tijdens het ophalen van het gebruikers profiel, probeer het later opnieuw of neem contact op met support."
    });
    return;
  }

  res.status(200).sendFile(path.join(__dirname, "../fixtures/base64.txt"));
};
