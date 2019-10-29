const express = require('express');
const path = require('path');
/* middleware */
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
const authMiddleware = require('./middleware/auth');
/* routers */
const adminRouter = require('./routes/admin');
const formDataRouter = require('./routes/formData');
const profilesRouter = require('./routes/profiles');
const authRouter = require('./routes/auth');
const otherRouter = require('./routes/other');

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

app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/formData', authMiddleware, formDataRouter);
app.use('/api/profiles', authMiddleware, profilesRouter);
app.use('/api/other', authMiddleware, otherRouter);

app.use(errorHandler);

module.exports = app;
