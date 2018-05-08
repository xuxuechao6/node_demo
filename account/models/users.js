const sql = require('../lib/sql');
const mysql = require('mysql');
const sqlConfig = require('../config/db').sql1;
const pool = mysql.createPool(sqlConfig);

exports.findByUsername = function(userName){
    const isEmial = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
    const isPhone = /^[1][356789]\d{9}$/
    if(isEmial.test(userName)){
        return new Promise(( resolve, reject ) => {
            console.log(3333,userName)
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject( err )
                } else {
                    connection.query(sql.getUserByEmail, [userName], ( err, rows) => {
                        if ( err ) {
                            reject( err )
                        } else {
                            console.log("getUserByEmail:",rows)
                            resolve( rows[0] )
                        }
                        connection.release()
                    })
                }
            })
        })
    }else if(isPhone.test(userName)){
        return new Promise(( resolve, reject ) => {
            console.log(3333,userName)
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject( err )
                } else {
                    connection.query(sql.getUserByPhone, [userName], ( err, rows) => {
                        if ( err ) {
                            reject( err )
                        } else {
                            console.log("getUserByPhone:",rows)
                            resolve( rows[0] )
                        }
                        connection.release()
                    })
                }
            })
        })
    }else{
        return new Promise(( resolve, reject ) => {
            console.log(3333,userName)
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject( err )
                } else {
                    connection.query(sql.getUserByUserName, [userName], ( err, rows) => {
                        if ( err ) {
                            reject( err )
                        } else {
                            console.log("getUserByUserName:",rows)
                            resolve( rows[0] )
                        }
                        connection.release()
                    })
                }
            })
        })
    }
}

exports.checkUserName = function(userName){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                console.log("zhao zhao zhao 用户名")
                connection.query(sql.getUserByUserName, [userName], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getUserByUserName:",rows)
                        resolve( rows[0] )
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
                connection.query(sql.getUserByEmail, [email], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getUserByEmail:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}


exports.register = function(username,password,email,salt){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.register, [username,password,email,salt], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("register:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

exports.resetPassword = function(username,password,salt){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.resetPassword, [password,salt,username], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("resetPassword:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}


exports.findById = function(id){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getUserById, [id], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getUserById:",rows)
                        resolve( rows[0] )
                    }
                    connection.release()
                })
            }
        })
    })
}



