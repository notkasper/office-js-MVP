const _ = require("lodash");
const msgraph = require("../msgraph");

module.exports = async (req, res) => {
  const accessToken = _.get(req, "cookies.access_token");
  if (!accessToken) {
    res.status(400).send({ message: "Please provide access token." });
    return;
  }

  let userDetails;
  try {
    userDetails = await msgraph.getUserDetails(accessToken);
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }

  res.status(200).send(userDetails);
};
