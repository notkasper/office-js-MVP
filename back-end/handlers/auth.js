const { AuthenticationContext } = require("adal-node");
const crypto = require("crypto");

const config = {
  tenant: "",
  authorityHostUrl: "https://login.windows.net",
  clientId: "",
  clientSecret: ""
};

const authorityUrl = `${config.AuthenticationContext}/${config.tenant}`;
// WARNING: GET THIS FROM CONFIG IN PROD AND USE NGROK
const redirectUri = "https://localhost:3000/getAccessToken";
const resource = "00000002-0000-0000-c000-000000000000";

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

const start = (req, res) => {
  crypto.randomBytes(48, (error, buffer) => {
    const token = buffer
      .toString("base64")
      .replace(/\//g, "_")
      .replace(/\+/g, "-");

    res.cookie("authstate", token);
    const authorizationUrl = createAuthorizationUrl(token);

    res.redirect(authorizationUrl);
  });
};

const handle = (req, res) => {
  if (req.cookies.authstate !== req.query.state) {
    res.status(500).send('error: state does not match');
    return;
  }
  const authenticationContext = new AuthenticationContext(authorityUrl);
  authenticationContext.acquireTokenWithAuthorizationCode(req.query.code, redirectUri, resource, sampleParameters.clientId, sampleParameters.clientSecret, (error, response) => {
    if (error) {
      const message = `error: ${error.message}\nresponse: ${JSON.stringify(response)}`;
      res.status(500).send(message);
      return;
    }
    // Later, if the access token is expired it can be refreshed.
    // authenticationContext.acquireTokenWithRefreshToken(response.refreshToken, sampleParameters.clientId, sampleParameters.clientSecret, resource, function(refreshErr, refreshResponse) {
    //   if (refreshErr) {
    //     message += 'refreshError: ' + refreshErr.message + '\n';
    //   }
    //   message += 'refreshResponse: ' + JSON.stringify(refreshResponse);

    //   res.send(message); 
    // }); 
  });
};

module.exports = {
  start,
  handle
};
