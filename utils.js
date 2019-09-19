const fs = require("fs");
const path = require("path");

const getSslKey = () => {
  const key = fs.readFileSync(path.join(__dirname, "key.txt"));
  return key.toString();
};

const getSslCert = () => {
  const cert = fs.readFileSync(path.join(__dirname, "cert.txt"));
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
