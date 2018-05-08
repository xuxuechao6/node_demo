'use strict';

const sql = require('../lib/sql');
const mysql = require('mysql');
const sqlConfig = require('../config/db').sql1;
const pool = mysql.createPool(sqlConfig);
const jwt = require('jsonwebtoken');

// The authorization codes.
// You will use these to get the access codes to get to the data in your endpoints as outlined
// in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
// (http://tools.ietf.org/html/rfc6750)

/**
 * Authorization codes in-memory data structure which stores all of the authorization codes
 */
let codes = Object.create(null);

/**
 * Returns an authorization code if it finds one, otherwise returns null if one is not found.
 * @param   {String}  token - The token to decode to get the id of the authorization token to find.
 * @returns {Promise} resolved with the authorization code if found, otherwise undefined
 */
// exports.find = (token) => {
//     try {
//         const id = jwt.decode(token).jti;
//         return Promise.resolve(codes[id]);
//     } catch (error) {
//         return Promise.resolve(undefined);
//     }
// };


exports.find = function(token){
    return new Promise(( resolve, reject ) => {
        const id = jwt.decode(token).jti;
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getToken, [id], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getToken:",rows)
                        resolve( rows[0] )
                    }
                    connection.release()
                })
            }
        })
    })
};


/**
 * Saves a authorization code, client id, redirect uri, user id, and scope. Note: The actual full
 * authorization token is never saved.  Instead just the ID of the token is saved.  In case of a
 * database breach this prevents anyone from stealing the live tokens.
 * @param   {String}  code        - The authorization code (required)
 * @param   {String}  clientID    - The client ID (required)
 * @param   {String}  redirectURI - The redirect URI of where to send access tokens once exchanged
 * @param   {String}  userID      - The user ID (required)
 * @param   {String}  scope       - The scope (optional)
 * @returns {Promise} resolved with the saved token
 */
// exports.save = (code, clientID, redirectURI, userID, scope) => {
//     const id = jwt.decode(code).jti;
//     codes[id] = { clientID, redirectURI, userID, scope };
//     return Promise.resolve(codes[id]);
// };
exports.save = function(code, clientID, redirectURI, userID, scope){
    return new Promise(( resolve, reject ) => {
        const id = jwt.decode(code).jti;
        console.log("id:",id)
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.saveToken, [id, clientID, redirectURI, userID, scope ], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("saveToken:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};
/**
 * Deletes an authorization code
 * @param   {String}  token - The authorization code to delete
 * @returns {Promise} resolved with the deleted value
 */
exports.delete = (token) => {
    try {
        const id = jwt.decode(token).jti;
        const deletedToken = codes[id];
        delete codes[id];
        return Promise.resolve(deletedToken);
    } catch (error) {
        return Promise.resolve(undefined);
    }
};
exports.delete = function(token){
    return new Promise(( resolve, reject ) => {
        const id = jwt.decode(token).jti;
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {

                connection.query(sql.getToken, [id], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        if(rows.length>0){
                            let result = rows[0]
                            connection.query(sql.deleteToken, [id] ,( err, rows) => {
                                if ( err ) {
                                    reject( err )
                                } else {
                                    console.log("deleteToken:",rows)
                                    console.log("deleteToken:",result)
                                    resolve( result )
                                }
                                connection.release()
                            })
                        }
                    }

                })

            }
        })
    })
};
/**
 * Removes all authorization codes.
 * @returns {Promise} resolved with all removed authorization codes returned
 */
// exports.removeAll = () => {
//     const deletedTokens = codes;
//     codes               = Object.create(null);
//     return Promise.resolve(deletedTokens);
// };

exports.removeAll = function(){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.removeAllToken, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("removeAllToken:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};
