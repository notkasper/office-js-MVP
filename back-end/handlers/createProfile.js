const uuidv4 = require('uuid/v4');
const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

module.exports = asyncHandler(async (req, res) => {
  const id = uuidv4();
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
  const profile = await getConnection().models.profile.create({
    id,
    creator: req.user.id,
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
