'use static'

var sha1 = require('sha1')
var getRawBody =require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')

module.exports = function(options,handler){
    var wechat = new Wechat(options)
    
     return function *(next) {

        var token = options.token,
        signature = this.query.signature,
            nonce = this.query.nonce,
            timestamp = this.query.timestamp,
            echostr = this.query.echostr,
            str = [token,timestamp,nonce].sort().join(''),
            sha = sha1(str);

         if(this.method === 'GET'){
             if(sha === signature){
                 this.body = echostr +''
             }else{
                 this.body = 'wrong'
             }
         }else if(this.method ==='POST') {
             if(sha !== signature){
                 this.body = 'wrong'
                 return false
             }
             //解析获取到的xml数据
             var data = yield getRawBody(this.req,{
                 length:this.length,
                 limit:'1mb',
                 encoding:this.charest
             })


             var content = yield util.parseXMLAsync(data)
             var message = util.formatMessage(content.xml)
             this.weixin = message

             yield handler.call(this, next)

             wechat.reply.call(this)
         }

    }

 }
