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

module.exports = {
  getSslCert,
  getSslKey,
  getEnv
};
