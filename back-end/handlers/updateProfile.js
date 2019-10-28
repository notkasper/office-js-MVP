const { getConnection } = require('../db');

module.exports = async (req, res) => {
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
    res.status(404).send({
      message: 'Profiel niet gevonden in database, probeer het later opnieuw of neem contact op met support.'
    });
    return;
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
};
