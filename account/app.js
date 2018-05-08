const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const login = require('./routes/login');
const oauth = require('./routes/oauth');

const oauthServer = require('./routes/oauthserver');

const app = express();

// Passport configuration
require('./middlewares/passport')
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
const engines = require('consolidate');
app.engine('jade', engines.jade);
app.engine('html', engines.ejs);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));  //设置 图标  '路径','名称'
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('RT-Thread'));

// 静态文件处理；
const publicPath = path.resolve(__dirname, "public");
app.use("/account", express.static(publicPath));

app.use(session({
    secret: 'RT-Thread', //secret的值建议使用随机字符串
    resave:true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/',function (req,res,next) {
    console.log("123456")
    if(req.headers['user-agent']){


    function brows($agent){//移动终端浏览器版本信息
        return {
            ios: !!$agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: $agent.indexOf('Android') > -1 || $agent.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: $agent.indexOf('iPhone') > -1 || $agent.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: $agent.indexOf('iPad') > -1, //是否iPad
        }
    }
    $a=brows(req.headers['user-agent']);
    console.log($a);
    let display = "";
    if ($a.iPad)//当ipad终端时
    {display = 'phone';}
    else if ($a.iPhone)//当iphone终端时
    {display = 'phone'; }
    else if ($a.ios)//当ios终端时
    {display = 'phone'; }
    else if ($a.android) //当Android终端时
    {display = 'phone';}
    else{
        display = 'pc';
    }
    req.session.display = display;
    console.log("display:",req.session.display)
     next();
    }else{
        next();
    }

})

app.use('/account/oauth', oauth);
app.use('/account', login);
app.use('/account/oauth2.0',oauthServer);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    console.log(">>>>>>?????")
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

module.exports = app;
