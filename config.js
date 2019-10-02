module.exports = {
  redirectUrl: {
    development: "https://6e0b93f6.ngrok.io/api/getAccessToken",
    staging: "https://duffy-addon-staging.azurewebsites.net/api/getAccessToken",
    production: "https://duffy-addon.azurewebsites.net/api/getAccessToken"
  },
  appBaseUrl: {
    development: "https://localhost:8080",
    staging: "https://duffy-addon-staging.azurewebsites.net",
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
