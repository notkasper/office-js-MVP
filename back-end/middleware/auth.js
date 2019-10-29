const { acquireTokenWithRefreshToken } = require('../handlers/auth');
const asyncHandler = require('../middleware/async');
const getUserDetails = require('../utils/getUserDetails');
const ErrorResponse = require('../utils/errorResponse');

module.exports = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  let refreshToken = req.cookies.refreshToken;
  if (!accessToken && !refreshToken) {
    return new ErrorResponse(
      'Geen access token of refresh token meegestuurd. Autoriseer opnieuw of neem contact op met support.',
      401
    );
  }
  if (!accessToken && refreshToken) {
    response = await acquireTokenWithRefreshToken(refreshToken);
    // update with new tokens
    accessToken = response.accessToken;
    refreshToken = response.refreshToken;
    req.cookies.accessToken = accessToken;
    req.cookies.refreshToken = refreshToken;
    res.cookie('accessToken', accessToken, {
      maxAge: response.expiresIn * 1000 // in milliseconds
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 365 * 20 // in milliseconds
    });
  }

  // set user so handlers can use it
  req.user = await getUserDetails(accessToken);

  next();
});
