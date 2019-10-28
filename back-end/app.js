const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const api = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(xssClean());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  expressRateLimit({
    windowMs: 1000 * 60 * 5, // 100 requests per 5 minutes
    max: 100
  })
);

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

module.exports = app;
