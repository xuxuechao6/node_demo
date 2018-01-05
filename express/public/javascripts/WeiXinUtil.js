var sha1 = require('sha1');

var weiXinSign = {
    APPID:'wxe269e38410b937a0',
    APPSECRET:'359a1ed7ff83d4782b8567ec1249cc9c',
    TOKEN:'xiaoxu',
    EncodingAESKey:'5CsF8RJozb9lgicNobex6i8hoPkouxlTNEeM4LOCZId'
}


/**
 * 签名验证
 * @param req
 * @returns {boolean}
 */
var checkSignature=function(req){
    var signature = req.query.signature,
        timestamp = req.query.timestamp,
        nonce = req.query.nonce;
    //排序
    var arr = [weiXinSign.TOKEN, timestamp, nonce];
    arr.sort();
    // 对比签名
    return sha1(arr.join("")) === signature;
}
/**
 * 发送文本消息
 * @param res
 * @param msg
 */
var sendTextMsg = function (req, res) {
    var msg = req.body.xml,
        responseMSg ="hello world";
    console.log("msg",req.body);
    var time = Math.round(new Date().getTime() / 1000);
    var funcFlag = msg.funcFlag ? msg.funcFlag : 0;
    console.log("msg.toUserName",msg.tousername[0])
    var output = "<xml>"+
        "<ToUserName><![CDATA["+msg.fromusername[0]+"]]></ToUserName>"+
        "<FromUserName><![CDATA["+msg.tousername[0]+"]]></FromUserName>"+
        "<CreateTime>"+time+"</CreateTime>"+
        "<MsgType><![CDATA[text]]></MsgType>"+
        "<Content><![CDATA["+responseMSg+"]]></Content>"+
        "<MsgId>"+msg.msgid+"</MsgId>"+
        "</xml>";
console.log("output",output)
    res.type('xml');
    res.send(output);


    //将要返回的消息通过一个简单的tmpl模板（npm install tmpl）返回微信
    var tmpl = require('tmpl');
    var replyTmpl = '<xml>' +
        '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
        '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
        '<CreateTime><![CDATA[{time}]]></CreateTime>' +
        '<MsgType><![CDATA[{type}]]></MsgType>' +
        '<Content><![CDATA[{content}]]></Content>' +
        '</xml>';

     var reply=tmpl(replyTmpl, {
        toUser: msg.tousername[0],
        fromUser: msg.fromusername[0],
        type: 'text',
        time: time,
        content: responseMSg
    });
     console.log(reply)
    res.end(reply);
}
/**
 * 发送图文消息
 * @param res
 * @param msg
 */
var sendNewsMsg = function (res, msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var articlesStr = "";
    for (var i = 0; i < msg.articles.length; i++) {
        articlesStr += "<item>" +
            "<Title><![CDATA[" + msg.articles[i].title + "]]></Title>" +
            "<Description><![CDATA[" + msg.articles[i].description + "]]></Description>" +
            "<PicUrl><![CDATA[" + msg.articles[i].picUrl + "]]></PicUrl>" +
            "<Url><![CDATA[" + msg.articles[i].url + "]]></Url>" +
            "</item>";
    }

    var funcFlag = msg.funcFlag ? msg.funcFlag : 0;
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[news]]></MsgType>" +
        "<ArticleCount>" + msg.articles.length + "</ArticleCount>" +
        "<Articles>" + articlesStr + "</Articles>" +
        "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";

    res.type('xml');
    res.send(output);
}

exports.checkSignature = checkSignature;
exports.sendNewsMsg = sendNewsMsg;
exports.sendTextMsg = sendTextMsg;
