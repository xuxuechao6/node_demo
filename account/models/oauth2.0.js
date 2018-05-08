const sql = require('../lib/sql');
const mysql = require('mysql');
const sqlConfig = require('../config/db').sql1;
const pool = mysql.createPool(sqlConfig);


exports.checkClientInfo = function(id){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getClients, [id], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("checkClientInfo:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};

exports.find = function(id){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getClients, [id], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("checkClientInfo:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};

