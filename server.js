var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var initDatabase = require('./server/config/initDatabase.js')
var models = require('./server/models');

/*models.sequelize.sync({ alter: true }).then(() => {
  console.log('sequelize init success')
  initDatabase(models)
})*/

var app = express();

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'server/public')));

var useRouter = require('./server/routes/useRouter');

useRouter(app)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('uncaughtException', function (err) {
  // This should not happen
  console.log(err.message);
});


module.exports = app
