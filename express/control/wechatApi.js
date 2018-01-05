// var mysql = require('mysql');
// var path = require('path');
// var fs = require('fs');
// var crypto = require('crypto');
var WeiXinUtil = require('../public/javascripts/WeiXinUtil')

var testWeiXin = function(req,res) {
    if (WeiXinUtil.checkSignature(req)) {
        var echostr = req.query.echostr;
        res.send(echostr)
    } else {
        res.send("hello");
    }
};

var login = function (req,res) {
        if(WeiXinUtil.checkSignature(req)){
            console.log("weixin")
            //res.send("success");
        }else{
            console.log("not weixin")
            //return false
        }

    WeiXinUtil.sendTextMsg(req,res)

}

exports.login = login;
exports.testWeiXin = testWeiXin;


