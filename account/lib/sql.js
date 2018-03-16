const mysql={
    getWXAccessToken:'SELECT * FROM wx_token WHERE openid = ? ORDER BY create_at DESC',
    addWXAccessToken:'INSERT INTO wx_token (access_token, expires_in, refresh_token, openid, scope, create_at) VALUES(?, ?, ?, ?, ?, ?)',
    getWXUserInfo:'SELECT * FROM wx_user_info WHERE openid = ? ',
    addWXUserInfo:'INSERT INTO wx_user_info (openid, username, sex, language, city, province, country, headimgurl, privilege, unionid ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    getClientInfo:'SELECT * FROM oauth2_client WHERE name = ? ',
    getClients:'SELECT * FROM oauth2_client WHERE client_id = ? ',
    addClientInfo:'INSERT INTO oauth2_client (client_id, name, client_secret, redirect_uri, grant_types, scope) VALUES(?, ?, ?, ?, ?, ?)',
    getQQAccessToken:'SELECT * FROM qq_token WHERE openid = ? ORDER BY create_at DESC',
    addQQAccessToken:'INSERT INTO qq_token (access_token, expires_in, refresh_token, openid, scope, create_at) VALUES(?, ?, ?, ?, ?, ?)',
    getUser:'SELECT * FROM uc_users WHERE phone = ? ',
    checkUserName:'SELECT * FROM uc_users WHERE username = ? ',
    checkEmail:'SELECT * FROM uc_users WHERE email = ? ',
    register:'INSERT INTO uc_users(username ,password,email) VALUES(?,?,?)',

}
module.exports = mysql;