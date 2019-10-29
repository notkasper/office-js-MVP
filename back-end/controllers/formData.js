const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');

exports.getAanhefs = asyncHandler(async (req, res) => {
  const aanhefs = await getConnection().models.aanhefs.findAll();

  res.status(200).send({ success: true, data: aanhefs });
});

exports.getDepartments = asyncHandler(async (req, res) => {
  const departments = await getConnection().models.departments.findAll();

  res.status(200).send({
    success: true,
    data: departments
  });
});

exports.getEstablishments = asyncHandler(async (req, res) => {
  const establishments = await getConnection().models.establishments.findAll();

  res.status(200).send({
    success: true,
    data: establishments
  });
});

exports.getGroetOpties = asyncHandler(async (req, res) => {
  const groetOpties = await getConnection().models.groetOpties.findAll();

  res.status(200).send({
    success: true,
    data: groetOpties
  });
});

exports.getWorkFunctions = asyncHandler(async (req, res) => {
  const workFunctions = await getConnection().models.workFunctions.findAll();

  res.status(200).send({ success: true, data: workFunctions });
});
