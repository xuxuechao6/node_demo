'use strict';

const config  = require('../config/index');
const db      = require('../models/index');
const _token   = require('../middlewares/token');
const process = require('process');
const md5 = require('md5');

/** Validate object to attach all functions to  */
/** 验证对象以附加所有函数  */
const validate = Object.create(null);

/** Suppress tracing for things like unit testing */
/** 对单元测试之类的东西进行跟踪*/
const suppressTrace = process.env.OAUTHRECIPES_SURPRESS_TRACE === 'true';

/**
 * Log the message and throw it as an Error
 * @param   {String} msg - Message to log and throw
 * @throws  {Error}  The given message as an error
 * @returns {undefined}
 */
/**
 *记录消息并将其抛出错误
 *@param    {string}    msg - 消息到日志并抛出
 *@throws   {Error}     将指定的消息作为错误
 * @returns {undefined}
 */
validate.logAndThrow = (msg) => {
    if (!suppressTrace) {
        console.trace(msg);
    }
    throw new Error(msg);
};

/**
 * Given a user and a password this will return the user if it exists and the password matches,
 * otherwise this will throw an error
 * @param   {Object} user     - The user profile
 * @param   {String} password - The user's password
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
/**
 * 给定一个用户和一个密码，如果它存在并且密码匹配，它将返回给用户,
 * 否则就会抛出一个错误
 * @param   {Object} user     - 用户模板
 * @param   {String} password - 用户的密码
 * @throws  {Error} 用户不存在或者密码不正确
 * @returns {Object} 用户是否有效
 */
validate.user = (user, password) => {
    validate.userExists(user);
    const encode = md5(md5(password)+user.salt);
    if (user.password !== encode) {
        validate.logAndThrow('User password does not match');
    }
    return user;
};

/**
 * Given a user this will return the user if it exists otherwise this will throw an error
 * @param   {Object} user - The user profile
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
/**
 * 给定一个用户如果它存在，它会返回给用户否则它会抛出一个错误
 * @param   {Object} user - The user profile
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
validate.userExists = (user) => {
    if (user == null) {
        validate.logAndThrow('User does not exist');
    }
    return user;
};

/**
 * Given a client and a client secret this return the client if it exists and its clientSecret
 * matches, otherwise this will throw an error
 * @param   {Object} client       - The client profile
 * @param   {String} clientSecret - The client's secret
 * @throws  {Error}  If the client or the client secret does not match
 * @returns {Object} The client if valid
 */
/**
 * 给定一个客户端和一个客户端秘密，如果它存在并且它的客户端秘密返回客户端匹配，否则会抛出一个错误
 * @param   {Object} client       - The client profile
 * @param   {String} clientSecret - The client's secret
 * @throws  {Error}  If the client or the client secret does not match
 * @returns {Object} The client if valid
 */
validate.client = (client, clientSecret) => {
    validate.clientExists(client);
    if (client.client_secret !== clientSecret) {
        validate.logAndThrow('Client secret does not match');
    }
    return client;
};

/**
 * Given a client this will return the client if it exists , otherwise this will throw an error
 * @param   {Object} client - The client profile
 * @throws  {Error}  If the client does not exist
 * @returns {Object} The client if valid
 */
validate.clientExists = (client) => {
    if (client == null) {
        validate.logAndThrow('Client does not exist');
    }
    return client;
};

/**
 * Given a token and accessToken this will return either the user or the client associated with
 * the token if valid.  Otherwise this will throw.
 * @param   {Object}  token       - The token
 * @param   {Object}  accessToken - The access token
 * @throws  {Error}   If the token is not valid
 * @returns {Promise} Resolved with the user or client associated with the token if valid
 */
validate.token = (token, accessToken) => {
    _token.verifyToken(accessToken);
    console.log("这是什么玩意？？")
    // token is a user token
    if (token.userID != null) {
        return db.users.findById(token.userID)
            .then(user => validate.userExists(user))
            .then(user => user);
    }
    // token is a client token
    return db.clients.findById(token.clientID)
        .then(client => validate.clientExists(client))
        .then(client => client);
};

/**
 * Given a refresh token and client this will return the refresh token if it exists and the client
 * id's match otherwise this will throw an error
 * throw an error
 * @param   {Object} token        - The token record from the DB
 * @param   {Object} refreshToken - The raw refresh token
 * @param   {Object} client       - The client profile
 * @throws  {Error}  If the refresh token does not exist or the client id's don't match
 * @returns {Object} The refresh token if valid
 */
validate.refreshToken = (token, refreshToken, client) => {
    _token.verifyToken(refreshToken);
    if (client.id !== token.clientID) {
        validate.logAndThrow('RefreshToken clientID does not match client id given');
    }
    return refreshToken;
};

/**
 * Given a auth code, client, and redirectURI this will return the auth code if it exists and is
 * not 0, the client id matches it, and the redirectURI matches it, otherwise this will throw an
 * error.
 * @param  {Object}  code        - The auth code record from the DB
 * @param  {Object}  authCode    - The raw auth code
 * @param  {Object}  client      - The client profile
 * @param  {Object}  redirectURI - The redirectURI to check against
 * @throws {Error}   If the auth code does not exist or is zero or does not match the client or
 *                   the redirectURI
 * @returns {Object} The auth code token if valid
 */
validate.authCode = (code, authCode, client, redirectURI) => {
    _token.verifyToken(code);
    console.log("code",code)
    console.log("client",client)
    console.log("authCode",authCode)
    console.log("redirectURI",redirectURI)
    if (client.id.toString() !== authCode.client_id.toString()) {
        validate.logAndThrow('AuthCode clientID does not match client id given');
    }
    if (redirectURI !== authCode.redirect_url) {
        validate.logAndThrow('AuthCode redirectURI does not match redirectURI given');
    }
    console.log("authCode",authCode)
    return authCode;
};

/**
 * I mimic openid connect's offline scope to determine if we send a refresh token or not
 * @param   {Array}   scope - The scope to check if is a refresh token if it has 'offline_access'
 * @returns {Boolean} true If the scope is offline_access, otherwise false
 */
validate.isRefreshToken = ({ scope }) =>{
    console.log("scope",scope)
   return scope != null && scope.indexOf('offline_access') === 0;
}

/**
 * Given a userId, clientID, and scope this will generate a refresh token, save it, and return it
 * @param   {Object}  userId   - The user profile
 * @throws  {Object}  clientID - the client profile
 * @throws  {Object}  scope    - the scope
 * @returns {Promise} The resolved refresh token after saved
 */
validate.generateRefreshToken = ({ user_id, client_id, scope }) => {
    const refreshToken = _token.createToken({ sub : user_id, exp : config.refreshToken.expiresIn });
    return db.refreshTokens.save(refreshToken, user_id, client_id, scope)
        .then(() => refreshToken);
};

/**
 * Given an auth code this will generate a access token, save that token and then return it.
 * @param   {userID}   userID   - The user profile
 * @param   {clientID} clientID - The client profile
 * @param   {scope}    scope    - The scope
 * @returns {Promise}  The resolved refresh token after saved
 */
validate.generateToken = ({ user_id, client_id, scope }) => {
console.log("1234",user_id,config.token.expiresIn )
    const token      = _token.createToken({ sub : user_id, exp : config.token.expiresIn });
    const expiration = config.token.calculateExpirationDate();
    console.log("?????")
    console.log(token, expiration, user_id, client_id, scope)
    return db.accessTokens.save(token, expiration, user_id, client_id, scope)
        .then(() => {
            console.log("generateToken",token)
            return token
        });
};

/**
 * Given an auth code this will generate a access and refresh token, save both of those and return
 * them if the auth code indicates to return both.  Otherwise only an access token will be returned.
 * @param   {Object}  authCode - The auth code
 * @throws  {Error}   If the auth code does not exist or is zero
 * @returns {Promise} The resolved refresh and access tokens as an array
 */
validate.generateTokens = (authCode) => {
    if (validate.isRefreshToken(authCode)) {
        return Promise.all([
            validate.generateToken(authCode),
            validate.generateRefreshToken(authCode),
        ]);
    }
    console.log(">>>>")
    return Promise.all([validate.generateToken(authCode)]);
};

/**
 * Given a token this will resolve a promise with the token if it is not null and the expiration
 * date has not been exceeded.  Otherwise this will throw a HTTP error.
 * @param   {Object}  token - The token to check
 * @returns {Promise} Resolved with the token if it is a valid token otherwise rejected with error
 */
validate.tokenForHttp = token =>
    new Promise((resolve, reject) => {
        try {
            _token.verifyToken(token);
        } catch (err) {
            const error  = new Error('invalid_token');
            error.status = 400;
            reject(error);
        }
        resolve(token);
    });

/**
 * Given a token this will return the token if it is not null. Otherwise this will throw a
 * HTTP error.
 * @param   {Object} token - The token to check
 * @throws  {Error}  If the client is null
 * @returns {Object} The client if it is a valid client
 */
validate.tokenExistsForHttp = (token) => {
    if (token == null) {
        const error = new Error('invalid_token');
        error.status = 400;
        throw error;
    }
    return token;
};


/**
 * Given a client this will return the client if it is not null. Otherwise this will throw a
 * HTTP error.
 * @param   {Object} client - The client to check
 * @throws  {Error}  If the client is null
 * @returns {Object} The client if it is a valid client
 */
validate.clientExistsForHttp = (client) => {
    if (client == null) {
        const error  = new Error('invalid_token');
        error.status = 400;
        throw error;
    }
    return client;
};

module.exports = validate;
