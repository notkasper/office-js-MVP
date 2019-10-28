const ErrorResponse = require('../utils/errorResponse');

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(error.name);
  console.error(error.name);
  console.error(error.name);
  console.error(error.name);
  console.error(error.name);

  res.status(error.statusCode || 500).json({ success: false, error: error.message });
};
