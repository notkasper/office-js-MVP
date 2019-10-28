const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

module.exports = asyncHandler(async (req, res) => {
  const departments = await getConnection().models.departments.findAll();

  res.status(200).send({
    success: true,
    data: departments
  });
});
