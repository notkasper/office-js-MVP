const mssql = require("mssql");
const {
  getDatabaseUrl,
  getDatabaseUser,
  getDatabasePassword,
  getDatabaseName
} = require("../utils");

const connect = async () => {
  try {
    await mssql.connect({
      user: getDatabaseUser(),
      password: getDatabasePassword(),
      server: getDatabaseUrl(),
      database: getDatabaseName(),
      options: {
        encrypt: true
      }
    });
  } catch (error) {
    console.error(
      `Error while connecting to mssql: ${JSON.stringify(
        error
      )}\nDid you add the IP to the database server firewall?`
    );
    return;
  }
  console.log("Connected to database.");
};

module.exports = {
  connect
};
