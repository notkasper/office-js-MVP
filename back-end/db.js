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
    console.error(`Error while connecting to mssql: ${error}`);
    return;
  }
  console.log("Connected to database.");
};

const performQuery = async query => {
  const result = await mssql.query(query);
  return result;
};

module.exports = {
  connect,
  performQuery
};
