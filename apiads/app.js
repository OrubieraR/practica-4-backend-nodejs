var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Lanzando el módulo de conexion connect-mongoose para la bbdd.
require('./lib/connect-mongoose');


// Inicializando el modelo de anuncio con sus esquemas.
require('./models/Anuncio');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Importación y carga del router api.
app.use('/api/anuncios', require('./routes/api/anuncios'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Devolviendo un error en JSON para la api.
  let isApiContent = isAPI(req);
  console.log(isApiContent);
  if (isApiContent) {
    res.json({ok:false,error:err.message});
    return;
  }
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
  
});

// Devolviendo un error en JSON para la api.
function isAPI(req){
  // console.log('Req es igual a '+req.originalUrl);
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
