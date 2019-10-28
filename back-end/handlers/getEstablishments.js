const { getConnection } = require('../db');

module.exports = async (req, res) => {
  const establishments = await getConnection().models.establishments.findAll();

  res.status(200).send({
    success: true,
    data: establishments
  });
};
