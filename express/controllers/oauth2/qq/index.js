var OAuth = require('wechat-oauth');
var Config = require('../mysql/config');

var db = require('../../../config/db').sql1;
var mysql = require('mysql');
var pool = mysql.createPool(db);
var sql = require('../../../lib/sql');
var config = new Config("qq");
var request = require('request')


function qqRedirect(req,res) {
    var authorization = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=';
     var url = authorization + config.client_id +'&redirect_uri='+config.redirect_uri+'&state=233&scope=get_user_info,get_vip_info,get_vip_rich_info'
    console.log(url);
    // 重定向请求到微信服务器
    res.redirect(url);
}

function qqLogin(req,res) {
    console.log(config.client_id)
    console.log(config.client_secret)
    //拿到code
    var code = req.query.code;
    //获取token
    console.log(code)
    var getTokenUrl = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id='+config.client_id+'&client_secret='+config.client_secret+'&code='+code+'&redirect_uri='+config.redirect_uri;
    // res.send(getTokenUrl);
    console.log("getTokenUrl",getTokenUrl)
    request.get({url:getTokenUrl},function (err, httpResponse, body) {

        var str = body;
        var access_token = str.split('=')[1].split('&')[0];
        console.log(1111,access_token)
        //获取用户openid
        var getMeUrl = 'https://graph.qq.com/oauth2.0/me?access_token=' + access_token;
        request.get({url:getMeUrl}, function (err, httpResponse, body) {
            //QQ返回的是字符串，不是json，也不能直接转json，日了狗
            var str = body;
            var jsonStr = str.replace('callback( ','');
            jsonStr = jsonStr.replace(' );','');
            jsonStr = JSON.parse(jsonStr);
            var qqOpenid = jsonStr['openid'];
            var qqClient_id = jsonStr['client_id'];
            //拿到两个参数以后去获取用户资料
            request.get({url:'https://graph.qq.com/user/get_user_info?access_token='+ access_token +'&oauth_consumer_key='+ config.client_id + '&openid=' + qqOpenid}, function (err, httpResponse, body) {
                body = JSON.parse(body);
                console.log(body)
                res.json({
                    "QQ_nickName": body.nickname,
                    "openid": qqOpenid,
                    "pic": body.figureurl_2,
                    "sex": body.gender,
                    "province": body.province + "-"+body.city
                });
            });
        })
    })


}
//==============================================
exports.qqRedirect = qqRedirect;
exports.qqLogin = qqLogin;
