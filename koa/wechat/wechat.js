'use strict'

var Promise = require("bluebird");
var _ = require('lodash')
var util = require("./util");
var fs = require("fs");
var request = Promise.promisify(require('request'))
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api ={
    accessToken:prefix+'token?grant_type=client_credential',
    temporary: {
        upload: prefix + 'media/upload?',
        fetch: prefix + 'media/get?'
    },
}

function Wechat(options) {
    console.log(options)
    var that = this
    this.appID = options.appID
    this.appSecret = options.appSecret
    this.getAccessToken = options.getAccessToken
    this.saveAccessToken = options.saveAccessToken

    this.fetchAccessToken()
}

Wechat.prototype.fetchAccessToken = function() {
    var that = this

    if(this.access_token && this.expires_in){
        if (this.isValidAccessToken(this)){
            return Promise.resolve(this)
        }
    }
      this.getAccessToken()
        .then(function(data){ //获取票据信息
            try{
                data =JSON.parse(data)
            }
            catch(e){  //异常捕捉（不合法，不存在）
                return that.updateAccessToken()   //更新票据
            }

            //拿到票据后   也要检查
            if(that.isValidAccessToken(data)){  //合法性检查
                console.log(1,data)
                return Promise.resolve(data)
            }else{
                return that.updateAccessToken()
            }
        })
        .then(function(data){
            console.log(2,data)
            that.access_token = data.access_token
            that.expires_in = data.expires_in
            that.saveAccessToken(data)

            return Promise.resolve(data)
        })
}

Wechat.prototype.isValidAccessToken = function(data) {

    if(!data || !data.access_token || !data.expires_in){
        return false
    }

    var access_token = data.access_token
    var expires_in = data.expires_in
    var now = (new Date().getTime())

    if (now < expires_in) {
        return true
    }else{
        return false
    }
}

Wechat.prototype.updateAccessToken = function(){
    var appID = this.appID
    var appSecret = this.appSecret
    var url = api.accessToken +'&appid='+appID+'&secret='+appSecret
    return new Promise(function(resolve,reject){
        request({url:url,json:true}).then(function(response){
            var data = response.body
            console.log("response.body",response.body)
            var now = (new Date().getTime())
            console.log("url",url)
            var expires_in = now + (data.expires_in -20)*1000
            data.expires_in = expires_in

            resolve(data)
        })
    })


}

Wechat.prototype.uploadMaterial = function(type, material, permanent) {
    var that = this
    var form = {}
    var uploadUrl = api.temporary.upload
    console.log("type",type)

    if (permanent) {
        uploadUrl = api.permanent.upload

        _.extend(form, permanent)
    }

    if (type === 'pic') {
        uploadUrl = api.permanent.uploadNewsPic

    }

    if (type === 'news') {
        uploadUrl = api.permanent.uploadNews
        form = material
    }
    else {
        form.media = fs.createReadStream(material)
    }

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function(data) {
                var url = uploadUrl + 'access_token=' + data.access_token

                if (!permanent) {
                    url += '&type=' + type
                }
                else {
                    form.access_token = data.access_token
                }
                console.log("url",url)
                var options = {
                    method: 'POST',
                    url: url,
                    json: true
                }

                if (type === 'news') {
                    options.body = form
                }
                else {
                    options.formData = form
                }

                request(options).then(function(response) {
                    var _data = response.body

                    if (_data) {
                        resolve(_data)
                    }
                    else {
                        throw new Error('Upload material fails')
                    }
                })
                    .catch(function(err) {
                        reject(err)
                    })
            })
    })
}

Wechat.prototype.reply = function () {
    var content = this.body
    var message = this.weixin
    console.log("content",content)
    var xml = util.tpl(content,message)
    this.status = 200
    this.type = 'application/xml'
    this.body = xml
}

module.exports = Wechat
