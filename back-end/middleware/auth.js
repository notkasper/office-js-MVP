const msgraph = require('../msgraph');
const { acquireTokenWithRefreshToken } = require('../handlers/auth');

module.exports = async (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  let refreshToken = req.cookies.refreshToken;
  if (!accessToken && !refreshToken) {
    res.status(401).send({
      message: 'Geen access token of refresh token meegestuurd. Autoriseer opnieuw of neem contact op met support.'
    });
    return;
  }
  if (!accessToken && refreshToken) {
    let response;
    try {
      response = await acquireTokenWithRefreshToken(refreshToken);
    } catch (error) {
      console.error(`Error while attempting to get new token with refresh token: ${error}`);
      res.status(500).send({
        message:
          'Er is iets mis gegaan tijdens het aanvragen van een nieuwe access token. Autoriseer opnieuw of neem contact op met support.'
      });
      return;
    }
    const {
      accessToken,
      refreshToken,
      expiresIn // in seconds
    } = response;
    // update with new tokens
    req.cookies.accessToken = accessToken;
    req.cookies.refreshToken = refreshToken;
    res.cookie('accessToken', accessToken, {
      maxAge: expiresIn * 1000 // in milliseconds
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 365 * 20 // in milliseconds
    });
  }

  req.user = await msgraph.getUserDetails(accessToken);

  next();
};
