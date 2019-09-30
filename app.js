
import fs from 'fs'
const headers = require( "./meddelwers/headers");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const app = express();
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




const routes = fs.readdirSync(path.join(__dirname, 'routes'));
routes.forEach(route => {
  const routeName = route.replace(/\.js$/, '').replace(/^index$/, '');
  const routePath = path.join(__dirname, 'routes', route);
  app.use(`/${routeName}`, require(routePath));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
