/* 
WARNING WARNING WARNING
WARNING WARNING WARNING
WARNING WARNING WARNING
WARNING WARNING WARNING
WARNING WARNING WARNING
WARNING WARNING WARNING

THIS FILE IS ONLY HERE BECAUSE IT CONTAINS SOME VALUES THAT ARE YET TO BE COPIED OVER TO AZURE
IT IS NOT USED ANYMORE
*/

module.exports = {
  redirectBaseUrl: {
    development: 'https://0d8ac515.ngrok.io',
    staging: 'https://duffy-addon-staging.azurewebsites.net',
    production: 'https://duffy-addon.azurewebsites.net'
  },
  appBaseUrl: {
    development: 'https://localhost:8080',
    staging: 'https://duffy-addon-staging.azurewebsites.net',
    production: 'https://duffy-addon.azurewebsites.net'
  },
  databaseUrl: {
    development: 'localhost',
    staging: 'duffy-server.database.windows.net',
    production: 'duffy-server.database.windows.net'
  },
  databaseUser: {
    development: 'sa',
    staging: 'duffy',
    production: 'duffy'
  },
  databasePassword: {
    development: 'officejsadmin',
    staging: '#HamKaas123',
    production: '#HamKaas123'
  },
  databaseName: {
    development: 'master',
    staging: 'Duffy-Database',
    production: 'Duffy-Database'
  },
  databasePort: {
    development: 1433,
    staging: 1433,
    production: 1433
  }
};
