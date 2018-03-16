const express = require('express');
const router = express.Router();
const site           = require('../middlewares/site');
const users           = require('../controllers/users/index');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('----weixin callback -----')
    res.render('index.ejs',{
        result: {title:'hello world'}
    });
});
router.get('/login', function(req, res, next) {
    res.render('login.ejs');
});

router.post('/login',function (req,res,next) {
console.log(11111)
    users.login(req,res,next)
});
//这里getUser方法需要自定义


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/register',function (req,res,next) {
    console.log("注册")
    res.render('register.ejs');
});
router.get('/register2',function (req,res,next) {
    console.log("注册成功")
    res.render('register2.ejs');
});


router.post('/register',function (req,res,next) {
    console.log("注册")
    users.register(req,res,next)
});

router.post('/checkUserName',function (req,res,next) {
    console.log("检查用户名是否存在")
    users.checkUserName(req,res,next)
});

router.post('/checkEmail',function (req,res,next) {
    console.log("检查邮箱是否存在")
    users.checkEmail(req,res,next)
});
router.post('/checkCode',function (req,res,next) {
    console.log("检查邮箱是否存在")
    users.checkCode(req,res,next)
});

module.exports = router;