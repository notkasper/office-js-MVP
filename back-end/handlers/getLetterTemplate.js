const path = require('path');

module.exports = async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../fixtures/base64.txt'));
};
