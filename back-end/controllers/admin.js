require('colors');
const fs = require('fs');
const path = require('path');
const { getConnection } = require('../db');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const clearTable = asyncHandler(async (req, res, next) => {
  console.log(`Clear table with name: ${req.params.name}`.magenta.bold);

  const connection = getConnection();
  const modelNames = Object.keys(connection.models);
  if (!modelNames.includes(req.params.name)) {
    return next(new ErrorResponse('Table does not exist', 404));
  }

  await connection.models[req.params.name].destroy({ where: {} });

  res.status(200).send({ success: true, data: {} });
});

const seedTable = asyncHandler(async (req, res, next) => {
  console.log(`Seed table with name: ${req.params.name}`.magenta.bold);

  const connection = getConnection();
  const modelNames = Object.keys(connection.models);
  if (!modelNames.includes(req.params.name)) {
    return next(new ErrorResponse('Table does not exist', 404));
  }
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, `../../_data/${req.params.name}.json`)));
  for (const datum of data) {
    await connection.models[req.params.name].create(datum);
  }

  res.status(200).send({ success: true, data: {} });
});

const clearTables = asyncHandler(async (req, res, next) => {
  console.log('Clear all tables'.magenta.bold);

  const connection = getConnection();
  for (const modelName of Object.keys(connection.models)) {
    await connection.models[modelName].destroy({ where: {} });
  }

  res.status(200).send({ success: true, data: {} });
});

const seedTables = asyncHandler(async (req, res, next) => {
  console.log('Seed all tables'.magenta.bold);

  const connection = getConnection();
  for (const modelName of Object.keys(connection.models)) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, `../../_data/${modelName}.json`)));
    for (const datum of data) {
      await connection.models[modelName].create(datum);
    }
  }

  res.status(200).send({ success: true, data: {} });
});

module.exports = {
  clearTable,
  seedTable,
  clearTables,
  seedTables
};
