var OAuth = require('wechat-oauth');
var Config = require('../mysql/config');

var db = require('../../../config/db').sql1;
var mysql = require('mysql');
var pool = mysql.createPool(db);
var sql = require('../../../lib/sql');
var config = new Config("wx");


function getToken(openid, callback) {
    console.log(666);
    pool.getConnection(function (err, connection) {
        console.log(555);
        if (err) {
            res.render("error.ejs");
        } else {
            connection.query(sql.getWXAccessToken, [openid], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return callback(err);
                    //退出query方法，后面的代码不执行了；
                }else {
                    console.log(2222)
                    console.log(sql.getAccessToken)
                    console.log(config.wechat.appID)
                    console.log(result)
                    return callback(null, result[0]);
                    /*
                    console.log(JSON.stringify(result));
                    if (result.length == 0) {
                        console.log("未查询到结果");
                        res.render("login.ejs");
                    }else {
                        console.log("查询到结果");
                        res.render("login.ejs");
                    }*/
                }
            })
        }
    });
}

function saveToken(openid, token, callback) {

    var fields = [token.access_token, token.expires_in, token.refresh_token, token.openid, token.scope, token.create_at];
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err)
        } else {
            connection.query(sql.addWXAccessToken, fields, function (err, result) {
                console.log(3333,result)
                if (err)
                    console.log("错误：" + err.message);
                return callback(err);
            })
        }
    });
}

function wxLogin(req,res) {
    console.log(config.client_id)
    console.log(config.client_secret)
    var client = new OAuth(config.client_id, config.client_secret,getToken,saveToken)
    var code = req.query.code;
    console.log("code",code)
    client.getAccessToken(code, function (err, result) {
        console.log("getAccessToken",result)
        if(result){
            console.log(result.data)
            var accessToken = result.data.access_token;
            var openid = result.data.openid;
            console.log(result.data)
            getUserInfo(openid)
        }

    });
    function getUserInfo(openid) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
            } else {
                //查询数据库里的用户信息
                connection.query(sql.getWXUserInfo, [openid], function (err, result) {
                    console.log(3333,result)
                    if (err){
                        console.log("错误：" + err.message);
                    }else if(result.length === 0){
                        //没有 登陆过的用户
                        getWXUserInfo(openid);
                    }else {
                        res.render('login.ejs')
                    }

                })
            }
        });



    }
    function getWXUserInfo(openid) {
        client.getUser(openid, function (err, result) {
            console.log(777,result)
            if(result.length !==0){
                var userInfo = result;
                console.log("userInfo",userInfo)
                var _userInfo = [result.openid, result.nickname, result.sex, result.language, result.city,
                    result.province, result.country, result.headimgurl, result.privilege, result.unionid];
                console.log(_userInfo)
                pool.getConnection(function (err, connection) {
                    if (err) {
                        console.log(err)
                    } else {
                        //添加用户信息
                        connection.query(sql.addWXUserInfo, _userInfo, function (err, result) {
                            if (err){
                                console.log("错误：" + err.message);
                            }else {
                                console.log(3333,result)
                            }

                        })
                    }
                });
            }
            // res.render('index.ejs',{
            //     result: {title:'hello world'}
            // });
            res.render('login.ejs')
        });
    }

}


function wxRedirect(req,res) {
    var domain = config.redirect_uri;
    var client = new OAuth(config.client_id, config.client_secret,getToken,saveToken)
console.log(client)

    //var auth_callback_url = domain + "/tp5/oauth/WX/oauth.php";
    var url = client.getAuthorizeURLForWebsite(domain);
    console.log(url);
    // 重定向请求到微信服务器
    res.redirect(url);
}



//==============================================
exports.wxRedirect = wxRedirect;
exports.wxLogin = wxLogin;
