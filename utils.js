const fs = require("fs");
const path = require("path");

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
    fs.readFileSync(path.join(__dirname, "cert.txt"));
  } catch (error) {
    throw new Error(`Error while reading ssl cert from file: ${error}`);
  }
  return cert.toString();
};

const getEnv = () => {
  const validEnvs = ["development, production"];
  const env = process.argv[2];
  if (!validEnvs.indexOf(env)) {
    throw new Error(`Invalid env: ${env}\nenv must be one of: [${validEnvs}]`);
  }
  return env;
};

module.exports = {
  getSslCert,
  getSslKey,
  getEnv
};
