require("isomorphic-fetch");
const { Client } = require("@microsoft/microsoft-graph-client");
const _ = require("lodash");

module.exports = async (req, res) => {
  const accessToken = _.get(req, "cookies.access_token");
  if (!accessToken) {
    res.status(400).send({ message: "Please provide access token." });
  }
  const authProvider = {
    getAccessToken: () => {
      return accessToken;
    }
  };

  const options = {
    authProvider
  };

  const client = Client.initWithMiddleware(options);

  let userDetails;
  try {
    userDetails = await client.api("/me").get();
  } catch (error) {
    console.error(
      `Error while requesting profile information: ${JSON.stringify(error)}`
    );
    res.status(500).send({
      message:
        "Er is iets fout gegaan bij het ophalen van het profiel, probeer het later opnieuw of neem contact op met support."
    });
  }

  res.status(200).send(userDetails);
};
