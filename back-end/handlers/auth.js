const { AuthenticationContext } = require("adal-node");
const crypto = require("crypto");

const config = {
  tenant: "0abccceb-93ba-4767-9038-76722263a6ee",
  authorityHostUrl: "https://login.windows.net",
  clientId: "f8e43d80-b4ca-4322-b6c7-84e39742e4d4",
  clientSecret: "ikNAuuI_jC/xGsyAGJ?Lei5/IeytV232"
};

const authorityUrl = `${config.authorityHostUrl}/${config.tenant}`;
// WARNING: GET THIS FROM CONFIG IN PROD AND USE NGROK
const redirectUri = "https://98190056.ngrok.io/api/getAccessToken";
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

const start = (req, res) => {
  crypto.randomBytes(48, (error, buffer) => {
    const token = buffer
      .toString("base64")
      .replace(/\//g, "_")
      .replace(/\+/g, "-");

    res.cookie("authstate", token);
    const authorizationUrl = createAuthorizationUrl(token);

    console.log(authorizationUrl);
    res.send({ url: authorizationUrl });
  });
};

const handle = (req, res) => {
  // if (req.cookies.authstate !== req.query.state) {
  //   res.status(500).send("error: state does not match");
  //   return;
  // }
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
      // WHEN THE CLIENT RECEIVES THIS IN THE DIALOG, THE DIALOG CAN BE CLOSED
      res.status(200).send({ response: JSON.stringify(response) });
      // Later, if the access token is expired it can be refreshed.
      // authenticationContext.acquireTokenWithRefreshToken(response.refreshToken, sampleParameters.clientId, sampleParameters.clientSecret, resource, function(refreshErr, refreshResponse) {
      //   if (refreshErr) {
      //     message += 'refreshError: ' + refreshErr.message + '\n';
      //   }
      //   message += 'refreshResponse: ' + JSON.stringify(refreshResponse);

      //   res.send(message);
      // });
    }
  );
};

module.exports = {
  start,
  handle
};
