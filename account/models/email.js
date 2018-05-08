const sql = require('../lib/sql');
const mysql = require('mysql');
const sqlConfig = require('../config/db').sql1;
const pool = mysql.createPool(sqlConfig);
const md5 = require('md5');

exports.postEmail = function(type){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.emailContent, [type], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("emailContentInfo:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};

exports.saveToken = function(data){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                console.log(data)
                connection.query(sql.saveEmailToken, [data.email,data.token,parseInt(data.reg_date)], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("saveEmailToken:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

exports.getToken = function(email){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getEmailToken, [email], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getEmailToken:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

exports.updateToken = function(data){

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.updateEmailToken, [data.token,parseInt(data.reg_date),data.email], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("updateEmailToken:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
exports.checkToken = function(data){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.checkEmailToken, [data], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("checkEmailToken:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
exports.checkTokenByEmail = function(data){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.checkTokenByEmail, [data], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("checkTokenByEmail:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
exports.activeAccount = function(data){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.activeAccount, [data], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("activeAccount:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

