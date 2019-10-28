const { getConnection } = require('../db');

module.exports = async (req, res) => {
  const profiles = await getConnection().models.profile.findAll({
    where: {
      creator: req.user.id
    }
  });

  res.status(200).send({ success: true, data: profiles });
};
