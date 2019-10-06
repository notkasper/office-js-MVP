const { AuthenticationContext } = require("adal-node");
const crypto = require("crypto");
const _ = require("lodash");
const { getRedirectBaseUrl, getAppBaseUrl } = require("../../utils");

const config = {
  tenant: "0abccceb-93ba-4767-9038-76722263a6ee",
  authorityHostUrl: "https://login.windows.net",
  clientId: "f8e43d80-b4ca-4322-b6c7-84e39742e4d4",
  clientSecret: "ikNAuuI_jC/xGsyAGJ?Lei5/IeytV232"
};

const authorityUrl = `${config.authorityHostUrl}/${config.tenant}`;
const redirectUri = `${getRedirectBaseUrl()}/api/getAccessToken`;
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
      const { accessToken, refreshToken, expiresIn } = response;
      res.redirect(
        `${getAppBaseUrl()}#authorized/${accessToken}/${refreshToken}/${expiresIn}`
      );
    }
  );
};

const acquireTokenWithRefreshToken = refreshToken => {
  return new Promise((resolve, reject) => {
    const authenticationContext = new AuthenticationContext(authorityUrl);
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
          reject(error);
          return;
        }
        resolve(response);
      }
    );
  });
};

const authMiddleware = async (req, res, next) => {
  const accessToken = _.get(req, "cookies.accessToken");
  const refreshToken = _.get(req, "cookies.refreshToken");
  if (!accessToken && !refreshToken) {
    res.status(401).send({
      message:
        "Geen access token of refresh token meegestuurd. Autoriseer opnieuw of neem contact op met support."
    });
    return;
  }
  if (!accessToken && refreshToken) {
    let response;
    try {
      response = await acquireTokenWithRefreshToken(refreshToken);
    } catch (error) {
      console.error(
        `Error while attempting to get new token with refresh token: ${error}`
      );
      res.status(500).send({
        message:
          "Er is iets mis gegaan tijdens het aanvragen van een nieuwe access token. Autoriseer opnieuw of neem contact op met support."
      });
      return;
    }
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn // in seconds
    } = response;
    req.cookies.accessToken = newAccessToken;
    req.cookies.refreshToken = newRefreshToken;
    res.cookie("accessToken", newAccessToken, {
      maxAge: expiresIn * 1000 // in milliseconds
    });
    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 60 * 60 * 24 * 365 * 20 // in milliseconds
    });
  }
  next();
};

module.exports = {
  getAuthorizationUrl,
  acquireTokenWithAuthorizationCode,
  authMiddleware
};
