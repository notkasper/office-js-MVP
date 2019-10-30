require('dotenv').config({ path: '.dev.env' });
require('colors');
const Sequelize = require('sequelize');

let sequelize;

const connect = async (force = false) => {
  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true
      }
    }
  });
  await sequelize.authenticate();

  // define models
  const Profile = sequelize.define('profile', {
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
    work_function: Sequelize.UUID,
    department: Sequelize.UUID,
    establishment: Sequelize.UUID,
    extra_text: Sequelize.STRING
  });

  const Establishment = sequelize.define('establishments', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: Sequelize.STRING
  });

  const Department = sequelize.define('departments', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: Sequelize.STRING
  });

  const WorkFunctions = sequelize.define('workFunctions', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: Sequelize.STRING
  });

  const Aanhefs = sequelize.define('aanhefs', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: Sequelize.STRING
  });

  const GroetOpties = sequelize.define('groetOpties', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: Sequelize.STRING
  });

  // sync
  await Profile.sync({ force });
  await Establishment.sync({ force });
  await Department.sync({ force });
  await WorkFunctions.sync({ force });
  await Aanhefs.sync({ force });
  await GroetOpties.sync({ force });
  console.log('Connected to database'.green.bold);
  return sequelize;
};

const getConnection = () => {
  return sequelize;
};

module.exports = {
  connect,
  getConnection
};
