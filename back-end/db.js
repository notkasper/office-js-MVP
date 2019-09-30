const mssql = require("mssql");
const { getDatabaseUrl } = require("../utils");

const connect = async () => {
  try {
    await mssql.connect({
      user: "duffy",
      password: "#HamKaas123",
      server: getDatabaseUrl(),
      database: "Duffy-Database",
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

module.exports = {
  connect
};
