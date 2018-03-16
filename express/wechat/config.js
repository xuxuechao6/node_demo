'use strict'

var util = require('./libs/util')
var Wechat = require('./wechat')
var path =require('path')
var wechat_file = path.join(__dirname,'./config.txt')

var config = {
    wechat:{
        // appID:'wxe269e38410b937a0',
        // appSecret:'b0ec74b1126e8fdcc8596032ef49b302',
        // EncodingAESKey:'5CsF8RJozb9lgicNobex6i8hoPkouxlTNEeM4LOCZId',
        appID:'wx9a865aa77929c654',
        appSecret:'964a0c8aaacf9ad56016ed023d32208c',
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

