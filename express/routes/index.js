var express = require('express');
var router = express.Router();
var wechatApi = require('./../wechat/api')
// var config = require('./../wechat/config')
// var request = require('request')

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

router.get('/checkWechat', function(req, res, next) {
    wechatApi.checkWechat(req, res)
});
// router.get('/wechat', function(req, res, next) {
//     var getWechat = wechatApi.getWechat()
//     console.log(333)
//     var data =  getWechat.fetchAccessToken()
//     console.log(4444)
//     var access_token = data.access_token
//     console.log(5555)
//     console.log(data.access_token)
//
// });



module.exports = router;
