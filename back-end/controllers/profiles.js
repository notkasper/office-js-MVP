const uuidv4 = require('uuid/v4');
const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

exports.getProfiles = asyncHandler(async (req, res) => {
  const profiles = await getConnection().models.profile.findAll({
    where: {
      creator: req.user.id
    }
  });

  res.status(200).send({ success: true, data: profiles });
});

exports.createProfile = asyncHandler(async (req, res) => {
  const id = uuidv4();
  const { formal_name, informal_name, phone_number, mobile_number, email, work_function, department, establishment, extra_text } = req.body;
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

exports.updateProfile = asyncHandler(async (req, res) => {
  const { formal_name, informal_name, phone_number, mobile_number, email, work_function, department, establishment, extra_text } = req.body;
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

exports.deleteProfile = asyncHandler(async (req, res) => {
  await getConnection().models.profile.destroy({
    where: {
      creator: req.user.id,
      id: req.params.id
    }
  });

  res.status(200).send({ success: true, data: {} });
});
