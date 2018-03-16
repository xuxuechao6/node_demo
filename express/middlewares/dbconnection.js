
var dbconfig=require('./../config/db').sql1;
var mysql=require('mysql');
function getConnection(callback) {
    var connect_pool=mysql.createPool(dbconfig);
    connect_pool.connectionLimit=20;
    connect_pool.queueLimit=10;
    connect_pool.getConnection(function (error,client) {
        if(error){
            console.log(error.message);
            setTimeout(getConnection,2000);
        }
        callback(client);
    });
}

exports.getConnection=getConnection;