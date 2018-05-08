const dbConfig=require('./../config/db').sql1;
const mysql = require('mysql');
const pool  = mysql.createPool(dbConfig);
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
};

module.exports = db;