module.exports = {
  redirectBaseUrl: {
    development: "https://ad67a219.ngrok.io",
    staging: "https://duffy-addon-staging.azurewebsites.net",
    production: "https://duffy-addon.azurewebsites.net"
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
