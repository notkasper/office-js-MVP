const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

module.exports = asyncHandler(async (req, res) => {
  const {
    formal_name,
    informal_name,
    phone_number,
    mobile_number,
    email,
    work_function,
    department,
    establishment,
    extra_text
  } = req.body;
  let profile = await getConnection().models.profile.findOne({
    where: {
      id: req.params.id,
      creator: req.user.id
    }
  });
  if (!profile) {
    return new ErrorResponse('Profile not found', 404);
  }
  profile = await profile.update({
    formal_name,
    informal_name,
    phone_number,
    mobile_number,
    email,
    work_function,
    department,
    establishment,
    extra_text
  });

  res.status(200).send({ success: true, data: profile });
});
