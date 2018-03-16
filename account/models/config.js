const mysql = require('mysql');
const db = require('../config/db').sql1;
const pool = mysql.createPool(db);
const sql = require('../lib/sql');

function Config(name,callback){
    console.log(5555)
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err)
        } else {
            connection.query(sql.getClientInfo, ['bbs'], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return callback(err);
                }else {
                    return result[0];
                }
            })

        }
    });
}


module.exports = Config;