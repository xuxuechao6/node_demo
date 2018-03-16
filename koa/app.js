'use static'

var Koa = require('koa')
var wechat = require('./wechat/g')

var config =require('./config')
var weixin =require('./weixinReply')



 var app = new Koa()

app.use(wechat(config.wechat,weixin.reply))

app.listen(3222)
console.log('listen localhost:3000')