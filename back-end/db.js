const Sequelize = require("sequelize");
const {
  getDatabaseUrl,
  getDatabaseUser,
  getDatabasePassword,
  getDatabaseName
} = require("../utils");

let sequelize;

const connect = async () => {
  try {
    sequelize = new Sequelize(
      getDatabaseName(),
      getDatabaseUser(),
      getDatabasePassword(),
      {
        dialect: "mssql",
        host: getDatabaseUrl(),
        logging: false,
        dialectOptions: {
          options: {
            encrypt: true
          }
        }
      }
    );
    await sequelize.authenticate();

    // define models
    const Profile = sequelize.define("profile", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      creator: Sequelize.STRING,
      formal_name: Sequelize.STRING,
      informal_name: Sequelize.STRING,
      phone_number: Sequelize.BIGINT,
      mobile_number: Sequelize.BIGINT,
      email: Sequelize.STRING,
      work_function: Sequelize.STRING,
      department: Sequelize.STRING,
      establishment: Sequelize.STRING,
      extra_text: Sequelize.STRING
    });

    // sync
    await Profile.sync();
  } catch (error) {
    console.error(
      `Error while connecting to mssql: ${error}\nDid you add the IP to the database server firewall?`
    );
    return;
  }
  console.log("Connected to database.");
};

const getConnection = () => {
  return sequelize;
};

module.exports = {
  connect,
  getConnection
};
