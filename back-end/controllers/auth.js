const { AuthenticationContext } = require('adal-node');
const crypto = require('crypto');
const { getRedirectBaseUrl, getAppBaseUrl } = require('../../utils');

const config = {
  tenant: '0abccceb-93ba-4767-9038-76722263a6ee',
  authorityHostUrl: 'https://login.windows.net',
  clientId: 'f8e43d80-b4ca-4322-b6c7-84e39742e4d4',
  clientSecret: 'ikNAuuI_jC/xGsyAGJ?Lei5/IeytV232'
};

const authorityUrl = `${config.authorityHostUrl}/${config.tenant}`;
const redirectUri = `${getRedirectBaseUrl()}/api/auth/token`;
const resource = 'https://graph.microsoft.com/';

const templateAuthzUrl = `https://login.windows.net/${config.tenant}/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>`;

const createAuthorizationUrl = state => {
  let authorizationUrl = templateAuthzUrl.replace('<client_id>', config.clientId);
  authorizationUrl = authorizationUrl.replace('<redirect_uri>', redirectUri);
  authorizationUrl = authorizationUrl.replace('<state>', state);
  authorizationUrl = authorizationUrl.replace('<resource>', resource);
  return authorizationUrl;
};

exports.getAuthorizationUrl = (req, res) => {
  crypto.randomBytes(48, async (error, buffer) => {
    if (error) {
      return next(new ErrorResponse('Could not generate authorization url', 500));
    }
    const token = buffer
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-');

    const authorizationUrl = createAuthorizationUrl(token);
    res.status(200).send({ url: authorizationUrl });
  });
};

exports.acquireTokenWithAuthorizationCode = (req, res) => {
  const authenticationContext = new AuthenticationContext(authorityUrl);
  authenticationContext.acquireTokenWithAuthorizationCode(
    req.query.code,
    redirectUri,
    resource,
    config.clientId,
    config.clientSecret,
    (error, response) => {
      if (error) {
        const message = `Error: ${error.message}\nresponse: ${JSON.stringify(response)}`;
        res.status(500).send(message);
        return;
      }
      const { accessToken, refreshToken, expiresIn } = response;
      res.redirect(`${getAppBaseUrl()}#authorized/${accessToken}/${refreshToken}/${expiresIn}`);
    }
  );
};

exports.acquireTokenWithRefreshToken = refreshToken => {
  return new Promise((resolve, reject) => {
    const authenticationContext = new AuthenticationContext(authorityUrl);
    authenticationContext.acquireTokenWithRefreshToken(refreshToken, config.clientId, config.clientSecret, resource, (error, response) => {
      if (error) {
        console.error(`Error while refreshing token: ${error}\nresponse: ${response}`);
        reject(error);
        return;
      }
      resolve(response);
    });
  });
};

exports.getUserDetails = async (req, res) => {
  res.status(200).send({ success: true, data: req.user });
};
