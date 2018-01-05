'use strict'

var util = require('./libs/util')
var path =require('path')
var wechat_file =path.join(__dirname,'./config/wechat.txt')

var config = {
    wechat:{
        appID:'wx39d143ed9b632f82',
        appSecret:'e0a988097d99db6847d28d9c59635393',
        token:'xiaoxu',
        getAccessToken:function(){
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file,data)
        },
    }
}
module.exports = config