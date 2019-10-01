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
  databaseUrl: {
    development: "duffy-server.database.windows.net",
    staging: "duffy-server.database.windows.net",
    production: "duffy-server.database.windows.net"
  },
  databaseUser: {
    development: "duffy",
    staging: "duffy",
    production: "duffy"
  },
  databasePassword: {
    development: "#HamKaas123",
    staging: "#HamKaas123",
    production: "#HamKaas123"
  },
  databaseName: {
    development: "Duffy-Database",
    staging: "Duffy-Database",
    production: "Duffy-Database"
  }
};
