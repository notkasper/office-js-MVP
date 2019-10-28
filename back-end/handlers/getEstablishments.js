const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

module.exports = asyncHandler(async (req, res) => {
  const establishments = await getConnection().models.establishments.findAll();

  res.status(200).send({
    success: true,
    data: establishments
  });
});
