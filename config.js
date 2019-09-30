module.exports = {
  redirectUrl: {
    development: "https://8bc18d46.ngrok.io/api/getAccessToken",
    staging: "https://8bc18d46.ngrok.io/api/getAccessToken",
    production: "https://duffy-addon.azurewebsites.net/api/getAccesssToken"
  },
  appBaseUrl: {
    development: "https://localhost:8080",
    staging: "https://localhost:3000",
    production: "https://duffy-addon.azurewebsites.net"
  },
  database: {
    development: "duffy-server.database.windows.net",
    staging: "duffy-server.database.windows.net",
    production: "duffy-server.database.windows.net"
  }
}