var mysql = require('mysql');
var db = require('../../../config/db').sql1;
var pool = mysql.createPool(db);
var sql = require('../../../lib/sql');

 var Config = function(name,callback) {
     var that =this;
    pool.getConnection(function (err, connection) {
        if (err) {
            res.render("error.ejs");
        } else {
            connection.query(sql.getClientInfo, [name], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return callback(err);
                    //退出query方法，后面的代码不执行了；
                }else {
                    // console.log("result",result)
                    // return callback(null,result)
                    // console.log("result",result[0].client_id)
                    that.client_id = result[0].client_id;
                    that.client_secret = result[0].client_secret;
                    that.redirect_uri = result[0].redirect_uri;
                    that.grant_types = result[0].grant_types;
                    that.scope = result[0].scope;
                    console.log("that",that)

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

module.exports = Config;