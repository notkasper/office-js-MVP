const fs = require('fs');
const path = require('path');

const getSslKey = () => {
  let key;
  try {
    key = fs.readFileSync(path.join(__dirname, 'key.txt'));
  } catch (error) {
    throw new Error(`Error while reading ssl key from file: ${error}`);
  }
  return key.toString();
};

const getSslCert = () => {
  let cert;
  try {
    cert = fs.readFileSync(path.join(__dirname, 'cert.txt'));
  } catch (error) {
    throw new Error(`Error while reading ssl cert from file: ${error}`);
  }
  return cert.toString();
};

module.exports = {
  getSslCert,
  getSslKey
};
