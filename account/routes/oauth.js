const express = require('express');
const router = express.Router();
const checkSession = require('./../middlewares/check').checkSession;
const wechat = require('../controllers/oauth2/wx');
const client = require('../controllers/oauth2/client')
const qq = require('../controllers/oauth2/qq');



router.get('/login', function(req, res, next) {
    console.log("000",req.url)
    client.clientRedirect(req,res);
});

 //微信登录流程
router.get('/pc/wx', checkSession ,function(req, res) {
    console.log("000",req.url)
    wechat.wxRedirect(req,res);
});


router.get('/wx', checkSession ,function(req, res) {
    console.log("000",req.url)
    wechat.wxRedirect(req,res);
});
router.get('/wx/redirect', checkSession ,function(req, res) {
    console.log("000",req.url)
    wechat.wxLogin(req,res);
});

//QQ登录流程
router.get('/pc/qq', checkSession ,function(req, res) {
    console.log("000",req.url)
    qq.qqRedirect(req,res);
});
router.get('/qq/redirect', checkSession ,function(req, res) {
    console.log("000",req.url)
    qq.qqLogin(req,res);
});


module.exports = router;