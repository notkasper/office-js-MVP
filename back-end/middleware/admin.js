const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const adminPassword = 'b7d9d1f2-8e80-4a3f-bcc1-554f0fed440a';

module.exports = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const isMatch = password === adminPassword;

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  next();
});
