module.exports = async (req, res) => {
  res.status(200).send({ success: true, data: req.user });
};
