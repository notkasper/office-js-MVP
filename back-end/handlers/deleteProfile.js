const _ = require("lodash");
const msgraph = require("../msgraph");
const { getConnection } = require("../db");

module.exports = async (req, res) => {
  const accessToken = _.get(req, "cookies.accessToken");
  const id = _.get(req, "params.profile_id");
  if (!accessToken) {
    res.status(400).send({ message: "Access token niet meegestuurd." });
  }

  let userDetails;
  try {
    userDetails = await msgraph.getUserDetails(accessToken);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Er is iets fout gegaan tijdens het ophalen van het gebruikers profiel, probeer het later opnieuw of neem contact op met support."
    });
    return;
  }

  const { id: creator } = userDetails;
  try {
    await getConnection().models.profile.destroy({
      where: {
        creator,
        id
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Er is iets fout gegaan tijdens het verwijderen van het profiel, probeer het later opnieuw of neem contact op met support."
    });
    return;
  }

  res.status(200).send({ message: "DELETED" });
};
