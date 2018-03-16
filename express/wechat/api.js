'use static'

var sha1 = require('sha1')
var getRawBody =require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')
var config = require('./config')


var checkWechat = function (req, res) {
    var options = config.wechat
    // console.log(options)
    var token = options.token,
        signature = req.query.signature,
        nonce = req.query.nonce,
        timestamp = req.query.timestamp,
        echostr = req.query.echostr,
        str = [token, timestamp, nonce].sort().join(''),
        sha = sha1(str);
    // console.log('req.method', req.method)
    // console.log('req.query', req.query)

    if (req.method === 'GET') {
        if (sha === signature) {
            res.send(echostr)
        } else {
            res.send('wrong')
        }
    } else if (req.method === 'POST') {
        if (sha !== signature) {
            res.send('wrong')
            return false
        }
    }
}
var getWechat = function() {
    var wechatApi = new Wechat(config.wechat)

    return wechatApi
}
    exports.checkWechat = checkWechat
    exports.getWechat = getWechat

