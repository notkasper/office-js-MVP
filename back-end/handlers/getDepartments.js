const { getConnection } = require('../db');

module.exports = async (req, res) => {
  const departments = await getConnection().models.departments.findAll();

  res.status(200).send({
    success: true,
    data: departments
  });
};
