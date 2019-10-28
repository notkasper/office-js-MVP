const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

module.exports = asyncHandler(async (req, res) => {
  const profiles = await getConnection().models.profile.findAll({
    where: {
      creator: req.user.id
    }
  });

  res.status(200).send({ success: true, data: profiles });
});
