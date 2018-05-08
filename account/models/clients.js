const sql = require('../lib/sql');
const mysql = require('mysql');
const db = require('../config/db').sql1;
const pool = mysql.createPool(db);

exports.findById =  id => {
    console.log(id)
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql.getClientsById, [id], (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log("getClientsById", rows)
                        if (rows.length >0) {
                            resolve(rows[0])
                        }
                        else {
                            reject(err)
                        }
                    }
                    connection.release()
                })
            }
        })
    })
}


exports.findByClientId =  clientId => {
    console.log(clientId)
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql.getClients, [clientId], (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log("getClients", rows)
                        if (rows.length >0) {
                            resolve(rows[0])
                        }
                        else {
                            reject(err)
                        }
                    }
                    connection.release()
                })
            }
        })
    })
}