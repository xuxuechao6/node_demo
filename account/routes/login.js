const express = require('express');
const router  = express.Router();
const users   = require('../controllers/users/index');
const email   = require('../controllers/email/index');
const site   = require('../middlewares/site');





/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('----weixin callback -----')
    res.render('index.ejs',{
        result: {title:'hello world'}
    });
});
router.get('/login', function(req, res, next) {
if(req.session.display==="phone"){
    res.render("login2.ejs");
}else if (req.session.display==="pc") {
    res.render("login.ejs");
}else{
    res.render("login.ejs");
}



});

router.get('/login/redirectTo', function(req, res, next) {
    res.json({"userInfo":req.session.userInfo});
});

const logs = function(){
    return function (req,res ,next) {
        console.log("中间键：",req.body)
        console.log("路径：",req.url)
        console.log("路径：",req.headers)
        next();
    }
};

router.post('/login', logs(),site.login);
//这里getUser方法需要自定义


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/account/login');
});

router.get('/register',function (req,res,next) {
    console.log("注册")
    res.render('register/step1.ejs');
});
router.get('/register/step2',function (req,res,next) {
    console.log("注册成功 2")
    if(req.session.username && req.session.email){
        res.render("register/step2.ejs",{"result":{"username":req.session.username,"email":req.session.email}})
    }else{
        res.redirect('/account/register');
    }

});
router.get('/register/step3',function (req,res,next) {
    console.log("注册成功 3");
    console.log(req.session.tokenInfo)
    if(req.session.tokenInfo !== undefined){
        console.log(1111)
        res.render('register/step3.ejs',{"result":req.session.tokenInfo});
    }else{
        res.redirect('/account/register');
    }

});


router.post('/register',function (req,res,next) {
    console.log("注册用户")
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

router.post('/validationEmail',function (req,res,next) {
    console.log("重复发送验证码")
    email.rePostEmail(req,res,next)
});

router.get('/register/ActivateAccount',function (req,res,next) {
    console.log("邮箱验证码验证")
    email.checkEmailToken(req,res,next)
});


router.get('/forgetPwd',function (req,res,next) {
    console.log("忘记密码")
    res.render('forgetpwd/step1.ejs');
});

router.post('/forgetPwd',function (req,res,next) {
    console.log("email 找回密码")
    users.postPwdEmail(req,res,next)
});

router.get('/forgetPwd/step2',function (req,res,next) {
    console.log("取回密码 2")
    if(req.session.username && req.session.email){
        res.render("forgetpwd/step2.ejs",{"result":{"username":req.session.username,"email":req.session.email}})
    }else{
        res.redirect('/account/login');
    }
});

router.post('/forgetPwd/validationEmail',function (req,res,next) {
    console.log("重复发送验证码")
    email.rePostEmail(req,res,next)
});

router.get('/forgetPwd/resetPassword',function (req,res,next) {
    console.log("邮箱验证码验证")
    email.checkEmailToken(req,res,next)
});

router.post('/forgetPwd/resetPassword',function (req,res,next) {
    console.log("修改密码")
    if(req.session.resetPassword === undefined){
        res.json({"result": {"status": false,"errInfo":"链接不可用"}})
    }else{
        users.resetPassword(req,res,next)
    }

});


router.get('/forgetPwd/step3',function (req,res,next) {
    console.log("找回密码 3");
    console.log(req.session.resetPassword)
    if(req.session.resetPassword !== undefined){
        res.render('forgetpwd/step3.ejs',{"result":req.session.resetPassword.tokenPwdInfo,"info":req.session.resetPassword});
    }else{
        res.redirect('/account/login');
       // res.render('forgetpwd/step3.ejs',{"result":false,"errInfo":"未知错误","info":req.query});
    }
});



module.exports = router;