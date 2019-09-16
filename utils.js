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

module.exports = {
  getSslCert,
  getSslKey
};
