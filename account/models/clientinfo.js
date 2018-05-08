var mysql = require('mysql');
var db = require('../config/db').sql1;
var pool = mysql.createPool(db);
var sql = require('../lib/sql');

 function clientSchema(name,callback){
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接错误")
        } else {
            connection.query(sql.getClientInfo, [name], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return callback(err);
                }else {
                     callback(result[0]);
                }
            })

        }
    });
}

exports.getClientInfo = function(name){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getClientInfo,[name], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getUserInfo:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};

exports.clientSchema = clientSchema;