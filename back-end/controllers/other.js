exports.getLetterTemplate = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../fixtures/base64.txt'));
};