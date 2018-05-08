/**
 * Created by cqb32_000 on 2015-12-12.
 */

var WeiXinUtil = require("../weixin/Util");

module.exports = {
    /**
     * 绑定手机号码
     */
    "/index\.html": function(){
        var url = "http://" + this.req.headers["host"] + this.req.originalUrl;

        WeiXinUtil.getJsSDKSignature(url, function(config){
            this.forward("index", config);
        }, this);
    }
};