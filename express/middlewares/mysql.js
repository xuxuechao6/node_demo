var dbconfig=require('./../config/db').sql1;
var mysql = require('mysql');
var pool  = mysql.createPool(dbconfig);
db.query = function(sql, callback){
    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, result, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, result, fields);
    });
}
module.exports = db;