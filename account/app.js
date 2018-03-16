const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const login = require('./routes/login');
const oauth = require('./routes/oauth');
const oauthServer = require('./routes/oauthserver');

const app = express();

// 设置跨域访问，方便开发
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*代表可访问的地址，可以设置指定域名
    res.header('Access-Control-Allow-Methods:POST,GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置 ejs 为页面模版
var engines = require('consolidate');
app.engine('jade', engines.jade);
app.engine('html', engines.ejs);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));  //设置 图标  '路径','名称'
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/oauth', oauth);
app.use('/', login);
app.use('/oauth2.0', oauthServer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

module.exports = app;
