module.exports = {
  redirectBaseUrl: {
    development: "https://bf3afede.ngrok.io",
    staging: "https://duffy-addon-staging.azurewebsites.net",
    production: "https://duffy-addon.azurewebsites.net"
  },
  appBaseUrl: {
    development: "https://localhost:8080",
    staging: "https://duffy-addon-staging.azurewebsites.net",
    production: "https://duffy-addon.azurewebsites.net"
  },
  databaseUrl: {
    development: "localhost\\OFFICEJSDB",
    staging: "duffy-server.database.windows.net",
    production: "duffy-server.database.windows.net"
  },
  databaseUser: {
    development: "sa",
    staging: "duffy",
    production: "duffy"
  },
  databasePassword: {
    development: "officejsadmin",
    staging: "#HamKaas123",
    production: "#HamKaas123"
  },
  databaseName: {
    development: "master",
    staging: "Duffy-Database",
    production: "Duffy-Database"
  }
};
