const { getConnection } = require('../db');

module.exports = async (req, res) => {
  const aanheffen = await getConnection().models.aanhefs.findAll();

  res.status(200).send({ success: true, data: aanheffen });
};
