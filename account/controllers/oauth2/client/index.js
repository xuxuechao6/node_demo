var clientSchema = require('../../../models/clientinfo').clientSchema;




function clientRedirect(req,res) {
        var authorization = 'http://localhost:3000/oauth2.0/authorize?response_type=code&client_id=';
    var client = req.query.client;
    clientSchema(client,function (result) {
        var url = authorization + result.client_id +'&redirect_uri='+result.redirect_uri+'&state=233&scope=get_user_info,get_vip_info,get_vip_rich_info'
        console.log("redirect_uri",url);
        // 重定向请求服务器
        res.redirect(url);
    });


}


//==============================================
exports.clientRedirect = clientRedirect;

