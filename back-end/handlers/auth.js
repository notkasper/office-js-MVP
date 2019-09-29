const { AuthenticationContext } = require("adal-node");
const crypto = require("crypto");
const { getRedirectUrl, getAppBaseUrl } = require("../../utils");

const config = {
  tenant: "0abccceb-93ba-4767-9038-76722263a6ee",
  authorityHostUrl: "https://login.windows.net",
  clientId: "f8e43d80-b4ca-4322-b6c7-84e39742e4d4",
  clientSecret: "ikNAuuI_jC/xGsyAGJ?Lei5/IeytV232"
};

const authorityUrl = `${config.authorityHostUrl}/${config.tenant}`;
// WARNING: GET THIS FROM CONFIG IN PROD AND USE NGROK
const redirectUri = getRedirectUrl();
const resource = "https://graph.microsoft.com/";

const templateAuthzUrl = `https://login.windows.net/${config.tenant}/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>`;

const createAuthorizationUrl = state => {
  let authorizationUrl = templateAuthzUrl.replace(
    "<client_id>",
    config.clientId
  );
  authorizationUrl = authorizationUrl.replace("<redirect_uri>", redirectUri);
  authorizationUrl = authorizationUrl.replace("<state>", state);
  authorizationUrl = authorizationUrl.replace("<resource>", resource);
  return authorizationUrl;
};

const getAuthorizationUrl = (req, res) => {
  crypto.randomBytes(48, async (error, buffer) => {
    const token = buffer
      .toString("base64")
      .replace(/\//g, "_")
      .replace(/\+/g, "-");

    const authorizationUrl = createAuthorizationUrl(token);
    res.status(200).send({ url: authorizationUrl });
  });
};

const acquireTokenWithAuthorizationCode = (req, res) => {
  const authenticationContext = new AuthenticationContext(authorityUrl);
  authenticationContext.acquireTokenWithAuthorizationCode(
    req.query.code,
    redirectUri,
    resource,
    config.clientId,
    config.clientSecret,
    (error, response) => {
      if (error) {
        const message = `error: ${error.message}\nresponse: ${JSON.stringify(
          response
        )}`;
        res.status(500).send(message);
        return;
      }
      // MAKE THIS GENERIC
      res
        .status(200)
        .redirect(
          `${getAppBaseUrl()}#authorized/${response.accessToken}/${
            response.refreshToken
          }`
        );
    }
  );
};

const acquireTokenWithRefreshToken = (req, res) => {
  // WIP: DOES NOT WORK CURRENTLY
  const {
    body: { refresh_token: refreshToken }
  } = req;
  authenticationContext.acquireTokenWithRefreshToken(
    refreshToken,
    config.clientId,
    config.clientSecret,
    resource,
    (error, response) => {
      if (error) {
        console.error(
          `Error while refreshing token: ${error}\nresponse: ${response}`
        );
      }
      res.send({ response });
    }
  );
};

module.exports = {
  getAuthorizationUrl,
  acquireTokenWithAuthorizationCode,
  acquireTokenWithRefreshToken
};
