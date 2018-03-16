const sql = require('../lib/sql');
const mysql = require('mysql');
const sqlConfig = require('../config/db').sql1;
const pool = mysql.createPool(sqlConfig);

exports.find = function(userName){
 return new Promise(( resolve, reject ) => {
        console.log(3333,userName)
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                console.log("zhao zhao zhao id")
                connection.query(sql.getUser, [userName], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("rows:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
exports.checkUserName = function(userName){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                console.log("zhao zhao zhao 用户名")
                connection.query(sql.checkUserName, [userName], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("rows:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
exports.checkEmail = function(email){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                console.log("zhao zhao zhao 邮箱号")
                connection.query(sql.checkEmail, [email], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("rows:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

exports.register = function(username,password,email){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.register, [username,password,email], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("rows:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
