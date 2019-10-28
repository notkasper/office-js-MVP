require('isomorphic-fetch'); // Pollyfill required by microsoft graph client
const { Client } = require('@microsoft/microsoft-graph-client');

module.exports = async accessToken => {
  const authProvider = {
    getAccessToken: () => {
      return accessToken;
    }
  };

  const options = {
    authProvider
  };

  const client = Client.initWithMiddleware(options);

  const userDetails = await client.api('/me').get();

  return userDetails;
};
