const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

module.exports = asyncHandler(async (req, res) => {
  const workFunctions = await getConnection().models.workFunctions.findAll();

  res.status(200).send({ success: true, data: workFunctions });
});
