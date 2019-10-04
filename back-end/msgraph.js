require("isomorphic-fetch"); // Pollyfill required by microsoft graph client
const { Client } = require("@microsoft/microsoft-graph-client");

const getUserDetails = async accessToken => {
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
    throw new Error(
      "Er is iets fout gegaan bij het ophalen van het profiel, probeer het later opnieuw of neem contact op met support."
    );
  }

  return userDetails;
};

module.exports = {
  getUserDetails
};
