const { AuthenticationContext } = require('adal-node');
const crypto = require('crypto');

const config = {
  tenant: '0abccceb-93ba-4767-9038-76722263a6ee',
  authorityHostUrl: 'https://login.windows.net',
  clientId: 'f8e43d80-b4ca-4322-b6c7-84e39742e4d4',
  clientSecret: 'ikNAuuI_jC/xGsyAGJ?Lei5/IeytV232'
};

const authorityUrl = `${config.authorityHostUrl}/${config.tenant}`;
const redirectUri = `${process.env.REDIRECT_BASE_URL}/api/auth/token`;
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
      return next(error);
    }
    const token = buffer
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-');

    const authorizationUrl = createAuthorizationUrl(token);
    res.status(200).send({ url: authorizationUrl });
  });
};

exports.acquireTokenWithAuthorizationCode = (req, res, next) => {
  const authenticationContext = new AuthenticationContext(authorityUrl);
  authenticationContext.acquireTokenWithAuthorizationCode(
    req.query.code,
    redirectUri,
    resource,
    config.clientId,
    config.clientSecret,
    (error, response) => {
      if (error) {
        return next(error);
      }
      const { accessToken, refreshToken, expiresIn } = response;
      res.redirect(`${process.env.APP_BASE_URL}#authorized/${accessToken}/${refreshToken}/${expiresIn}`);
    }
  );
};

exports.acquireTokenWithRefreshToken = refreshToken => {
  return new Promise((resolve, reject) => {
    const authenticationContext = new AuthenticationContext(authorityUrl);
    authenticationContext.acquireTokenWithRefreshToken(
      refreshToken,
      config.clientId,
      config.clientSecret,
      resource,
      (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      }
    );
  });
};

exports.getUserDetails = async (req, res) => {
  res.status(200).send({ success: true, data: req.user });
};
