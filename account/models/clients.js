const sql = require('../lib/sql');
const mysql = require('mysql');
const db = require('../config/db').sql1;
const pool = mysql.createPool(db);


exports.findByClientId = clientId =>
    Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
        if (err) {
            reject( err )
        } else {
            console.log("zhao zhao zhao id")
            connection.query(sql.getClients, clientId, ( err, rows) => {

                if ( err ) {
                    reject( err )
                } else {
                    console.log("rows",rows)
                    if(rows[0].length ===1){
                        resolve( true )
                    }

                    else {
                        resolve( false )
                    }
                }
                connection.release()
            })
        }
    })
})