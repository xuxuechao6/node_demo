var express = require('express');
var router = express.Router();
var wechatApi = require('./../control/wechatApi')



/* GET home page. */
router.get('/', function(req, res, next) {

    if(this.req.method === "GET"){
        var signature = this.get("signature");
        var timestamp = this.get("timestamp");
        var nonce = this.get("nonce");
        var echostr = this.get("echostr");

        if(WeiXinUtil.checkSignature(signature, timestamp, nonce)){
            this.res.send(echostr);
        }else{
            this.res.send("hello");
        }
    }

});
router.get('/testWeiXin', function(req, res, next) {
    wechatApi.testWeiXin(req, res, next);
});
router.post('/testWeiXin', function(req, res, next) {
    wechatApi.login(req, res, next);
});
module.exports = router;
