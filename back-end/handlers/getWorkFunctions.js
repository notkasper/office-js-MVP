const _ = require('lodash');
const msgraph = require('../msgraph');
const { getConnection } = require('../db');

module.exports = async (req, res) => {
  const workFunctions = await getConnection().models.workFunctions.findAll();

  res.status(200).send({ success: true, data: workFunctions });
};
