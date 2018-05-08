const OAuth = require('wechat-oauth');
const ClientInfo = require('../../../models/clientinfo');
const db = require('../../../config/db').sql1;
const mysql = require('mysql');
const pool = mysql.createPool(db);
const sql = require('../../../lib/sql');
const wxusers = require('../../../models/index').wxusers;


let client = "";
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
    var code = req.query.code;
    console.log("code",code)
    client.getAccessToken(code, function (err, result) {
        if(result){
            var accessToken = result.data.access_token;
            var openid = result.data.openid;
            var unionid = result.data.unionid;
            console.log(unionid)
            wxusers.getUserInfo(unionid)
                .then(result => {
                    console.log("result", result)
                    if(result.length === 0){
                        //没有 登陆过的用户
                        addWXUserInfo(openid);
                    }else {
                        res.render('login.ejs')
                    }
                })
                .catch(err => {
                    console.log("系统错误！！！", err)
                    console.log("errCode", err.responseCode)
                    console.log("保存用户失败")
                });
        }
    });


    function addWXUserInfo(openid) {
        client.getUser(openid, function (err, result) {
            console.log(777,result)
            if(result.length !==0){
                console.log("userInfo",result)
               wxusers.addUserInfo(result)
                   .then(result => {
                       console.log("result", result)
                       if (result != null) {
                           console.log("保存用户成功")
                       } else {
                           console.log("保存用户失败")
                       }
                   })
                   .catch(err => {
                       console.log("系统错误！！！", err)
                       console.log("errCode", err.responseCode)
                       console.log("保存用户失败")
                   });


            }
            res.render('login.ejs')
        });
    }

}


function wxRedirect(req,res) {
    var name = '';
    if(req.url ==="/pc/wx"){
        name = "WXPC";
    }else{
        name = "WX";
    }
    console.log(name)
    ClientInfo.getClientInfo(name)
        .then(result => {
            console.log("result", result)
            if (result.length > 0) {
                let domain = result[0].redirect_uri;
                client = new OAuth(result[0].client_id, result[0].client_secret,getToken,saveToken)
                console.log(client)
                if(name ==="WX"){
                    var url = client.getAuthorizeURL(domain, 'rt-thread', 'snsapi_userinfo');;
                    console.log("WXurl",url);
                    // 重定向请求到微信服务器
                    res.redirect(url);
                }else{
                    var url = client.getAuthorizeURLForWebsite(domain);
                    console.log("PCurl",url);
                    // 重定向请求到微信服务器
                    res.redirect(url);
                }
            } else {

            }
        })
        .catch(err => {
            console.log("系统错误！！！", err)
            console.log("errCode", err.responseCode)
            console.log("保存用户失败")
        });








}


/**
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新用户，注册并绑定，然后跳转到手机号验证界面
 * - 如果是老用户，跳转到主页
 */
// router.get('/callback', function(req, res) {
//     console.log('----weixin callback -----')
//     var code = req.query.code;
//     var User = req.model.UserModel;
//
//     client.getAccessToken(code, function (err, result) {
//         console.dir(err);
//         console.dir(result);
//         var accessToken = result.data.access_token;
//         var openid = result.data.openid;
//         var unionid = result.data.unionid;
//
//         console.log('token=' + accessToken);
//         console.log('openid=' + openid);
//         console.log('unionid=' + unionid);
//
//
//         User.find_by_unionid(unionid, function(err, user){
//             console.log('微信回调后，User.find_by_unionid(unionid) 返回的user = ' + user)
//             if(err || user == null){
//                 console.log('经过unionid查询无结果');
//
//                 client.getUser(openid, function (err, get_by_openid) {
//                     console.log(get_by_openid);
//                     var oauth_user = get_by_openid;
//
//                     var _user = new User(oauth_user);
//                     _user.username = oauth_user.nickname;
//
//                     _user.save(function(err, user_save) {
//                         if (err) {
//                             console.log('User save error ....' + err);
//                         } else {
//                             console.log('User save sucess ....' + err);
//                             req.session.current_user = void 0;
//                             res.redirect('/users/' + user_save._id + '/verify');
//                         }
//                     });
//                 });
//             }else{
//                 console.log('根据unionid查询，用户已经存在')
//                 // if phone_number exist,go home page
//                 if(user.is_valid == true){
//                     req.session.current_user = user;
//                     res.redirect('/mobile/')
//                 }else{
//                     //if phone_number exist,go to user detail page to fill it
//                     req.session.current_user = void 0;
//                     res.redirect('/users/' + user._id + '/verify');
//                 }
//             }
//         });
//     });
// });
//
// router.post('/getsignature', function(req, res) {
//     var url = req.body.url;
//     var re = /\/$/;
//
//     if(!re.test(url)) {
//         url = url + '/'
//     }
//     console.log('\033[32m'+url+'\033[39m');
//
//     var config = {
//         cache_json_file: req.server_path,
//         appId: app_id,
//         appSecret: app_secret,
//         appToken: 'mengxiaoban.com'
//     };
//
//     signature.getSignature(config)(url, function(error, result) {
//         console.log(result);
//         if (error) {
//             res.json({
//                 'error': error
//             });
//         } else {
//             res.json(result);
//         }
//     });
// });


//==============================================
exports.wxRedirect = wxRedirect;
exports.wxLogin = wxLogin;
