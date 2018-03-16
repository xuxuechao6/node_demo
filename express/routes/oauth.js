var express = require('express');
var router = express.Router();
var checkSession= require('./../middlewares/check').checkSession;
var wechat= require('../controllers/oauth2/wx');
var qq= require('../controllers/oauth2/qq');


// 主页,主要是负责OAuth认真
 //微信登录流程
router.get('/pc/wx', checkSession ,function(req, res) {
    console.log("000",req.url)
    wechat.wxRedirect(req,res);
})
router.get('/pc/wx/code', checkSession ,function(req, res) {
    console.log("000",req.url)
    wechat.wxLogin(req,res);
})

//QQ登录流程
router.get('/pc/qq', checkSession ,function(req, res) {
    console.log("000",req.url)
    qq.qqRedirect(req,res);
})
router.get('/qq/code', checkSession ,function(req, res) {
    console.log("000",req.url)
    qq.qqLogin(req,res);
})

module.exports = router;