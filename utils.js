const fs = require("fs");
const path = require("path");
const config = require("./config");

const getSslKey = () => {
  let key;
  try {
    key = fs.readFileSync(path.join(__dirname, "key.txt"));
  } catch (error) {
    throw new Error(`Error while reading ssl key from file: ${error}`);
  }
  return key.toString();
};

const getSslCert = () => {
  let cert;
  try {
    cert = fs.readFileSync(path.join(__dirname, "cert.txt"));
  } catch (error) {
    throw new Error(`Error while reading ssl cert from file: ${error}`);
  }
  return cert.toString();
};

const getEnv = () => {
  const validEnvs = ["development", "staging", "production"];
  let env = process.argv[2];
  if (!validEnvs.includes(env)) {
    console.error(
      `Invalid env: ${env}\nenv must be one of: [${validEnvs}]. Falling back to development`
    );
    env = "development";
  }
  return env;
};

const getRedirectBaseUrl = () => {
  const env = getEnv();
  const url = config.redirectUrl[env];
  if (!url) {
    throw new Error(`Could not find redirect url for env: ${env}`);
  }
  return url;
};

const getAppBaseUrl = () => {
  const env = getEnv();
  const url = config.appBaseUrl[env];
  if (!url) {
    throw new Error(`Could not find app base url for env: ${env}`);
  }
  return url;
};

const getDatabaseUrl = () => {
  const env = getEnv();
  const url = config.databaseUrl[env];
  if (!url) {
    throw new Error(`Could not find database url for env: ${env}`);
  }
  return url;
};

const getDatabaseUser = () => {
  const env = getEnv();
  const url = config.databaseUser[env];
  if (!url) {
    throw new Error(`Could not find database user for env: ${env}`);
  }
  return url;
};

const getDatabasePassword = () => {
  const env = getEnv();
  const url = config.databasePassword[env];
  if (!url) {
    throw new Error(`Could not find database password for env: ${env}`);
  }
  return url;
};

const getDatabaseName = () => {
  const env = getEnv();
  const url = config.databaseName[env];
  if (!url) {
    throw new Error(`Could not find database name for env: ${env}`);
  }
  return url;
};

module.exports = {
  getSslCert,
  getSslKey,
  getEnv,
  getRedirectBaseUrl,
  getAppBaseUrl,
  getDatabaseUrl,
  getDatabaseUser,
  getDatabasePassword,
  getDatabaseName
};
