const path = require('path');
const fs = require('fs');

exports.getLetterTemplate = (req, res) => {
  const docxFile = fs.readFileSync(path.join(__dirname, '../fixtures/sjabloon_final.docx'));
  const base64 = new Buffer(docxFile).toString('base64');
  res.status(200).send({ success: true, data: base64 });
};
