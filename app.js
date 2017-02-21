var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use('/newapp/labels', require('./routes/i18n'));
app.use('/newapp/reservation', require('./routes/reservation'));
app.use('/newapp/checkin', require('./routes/checkin'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  let errorResponse = typeof err.message === "object" ? JSON.stringify(err.message) : {"message" : err.message};
  res.status(err.status || 500).json(errorResponse);
});

module.exports = app;
