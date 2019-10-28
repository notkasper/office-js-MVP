const { getConnection } = require('../db');

module.exports = async (req, res) => {
  await getConnection().models.profile.destroy({
    where: {
      creator: req.user.id,
      id: req.params.id
    }
  });

  res.status(200).send({ success: true, data: {} });
};
