const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

const emptyTable = asyncHandler(async (req, res, next) => {
  console.log(`Delete table with name: ${req.params.name}`);

  await getConnection().models[req.params.name].destroy({ where: {} });

  res.status(200).send({ success: true, data: {} });
});

module.exports = {
  emptyTable
};
