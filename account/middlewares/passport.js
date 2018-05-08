'use strict';

const db                                   = require('../models/index');
const passport                             = require('passport');
const { Strategy: LocalStrategy }          = require('passport-local');
const { BasicStrategy }                    = require('passport-http');
const { Strategy: ClientPasswordStrategy } = require('passport-oauth2-client-password');
const { Strategy: BearerStrategy }         = require('passport-http-bearer');
const validate                             = require('./validate');

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
/**
 * LocalStrategy
 *
 *该策略用于根据用户名和密码对用户进行身份验证。
 *任何时候请求授权应用程序时，我们都必须确保
 *用户在请求他们批准请求之前已经登录了
 */
passport.use(new LocalStrategy((username, password, done) => {
    console.log("密码验证")
    db.users.findByUsername(username)
        .then(user => validate.user(user, password))
        .then(user => done(null, user))
        .catch(() => done(null, false));
}));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
/**
 * 基本策略 & 客户端密码策略
 *
 * 这些策略用于对注册的OAuth客户端进行身份验证。他们是
 用于保护“令牌”端点，消费者使用该端点
 访问令牌。OAuth 2.0规范建议客户端使用
 用于验证的HTTP基本方案。使用客户端密码策略
 允许客户端在请求体中发送相同的凭据（相反
 “授权”头)。虽然这种方法不被推荐
 这个规范在实践中是很常见的。
 */
passport.use(new BasicStrategy((clientId, clientSecret, done) => {
    console.log("客户端ID验证")
    db.clients.findByClientId(clientId)
        .then(client => validate.client(client, clientSecret))
        .then(client => done(null, client))
        .catch(() => done(null, false));
}));

/**
 * Client Password strategy
 *
 * The OAuth 2.0 client password authentication strategy authenticates clients
 * using a client ID and client secret. The strategy requires a verify callback,
 * which accepts those credentials and calls done providing a client.
 *//**
 * Client Password strategy
 *
 OAuth 2.0客户端密码身份验证策略验证客户端
 使用客户端ID和客户端机密。该策略需要一个验证回调，
 它接受提供客户端的凭证和调用。
 */
passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
    console.log("this??",clientId)
    db.clients.findByClientId(clientId)
        .then(client => validate.client(client, clientSecret))
        .then(client => done(null, client))
        .catch(() => done(null, false));
}));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 *
 * To keep this example simple, restricted scopes are not implemented, and this is just for
 * illustrative purposes
 */
/**
 * BearerStrategy
 *
 此策略用于根据访问令牌对用户或客户进行身份验证
 （也就是一个不记名的令牌）。如果用户，他们必须事先授权一个客户
 应用程序，它发出一个访问令牌来代表请求发出请求
 *授权用户。
 *
 为了保持这个示例简单，限制范围没有实现，这只是为了
 *便于说明
 */
passport.use(new BearerStrategy((accessToken, done) => {
    db.accessTokens.find(accessToken)
        .then(token => validate.token(token, accessToken))
        .then(token => done(null, token, { scope: '*' }))
        .catch(() => done(null, false));
}));

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTPS request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.


// Register serialialization and deserialization functions.
//
// 当客户端将用户重定向到用户授权端点时，
// 授权事务启动。为了完成交易，
// 用户必须对授权请求进行身份验证和批准。因为这
// 可能涉及多个HTTPS请求/响应交换，事务是
// 存储在会话中。
// 应用程序必须提供序列化函数，这将决定如何使用
// 客户端对象被序列化到会话中。通常这是一个
// 序列化客户端ID的简单问题，并通过查找反序列化
// 来自数据库的ID。
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("反序列化")
    db.users.find(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});