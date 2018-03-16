'use strict';

const db          = require('../models');
const login    = require('connect-ensure-login');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//这里的username可以改成前端表单对应的命名，如：
// <form><input type="text" name="hehe">...</form>
//则这里将所有的username改为hehe
passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
    //实现用户名或邮箱登录
    //这里判断提交上的username是否含有@，来决定查询的字段是哪一个
    const criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
    User.findOne(criteria, function(err, user) {
        if (!user) return done(null, false, { message: '用户名或邮箱 ' + username + ' 不存在'});
        bcompare(password, hash, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: '密码不匹配' });
            }
        });
    });
}));
/**
 * Render the index.ejs or index-with-code.js depending on if query param has code or not
 * @param   {Object} req - The request
 * @param   {Object} res - The response
 * @returns {undefined}
 */
exports.index = (req, res) => {
    if (!req.query.code) {
        res.render('index');
    } else {
        res.render('index-with-code');
    }
};

/**
 * Render the login.ejs
 * @param   {Object} req - The request
 * @param   {Object} res - The response
 * @returns {undefined}
 */
exports.loginForm = (req, res) => {
    res.render('login');
};

/**
 * Authenticate normal login page using strategy of authenticate
 */
// exports.login = [
//     passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
// ];
exports.login = passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
        return res.redirect('/login');
    }
    req.logIn(user, function(err) {
        if (err) return next(err);
        res.redirect('/');
    });
})



// //将req.isAuthenticated()封装成中间件
// const isAuthenticated = function(req, res, next) {
//     //if (req.isAuthenticated()) return next();
//     res.redirect('/login');
// };

const bcompare = function (str, hash, callback) {
    bcrypt.compare(str, hash, callback);
};

/**
 * Logout of the system and redirect to root
 * @param   {Object}   req - The request
 * @param   {Object}   res - The response
 * @returns {undefined}
 */
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

/**
 * Render account.ejs but ensure the user is logged in before rendering
 * @param   {Object}   req - The request
 * @param   {Object}   res - The response
 * @returns {undefined}
 */
exports.account = [
    login.ensureLoggedIn(),
    (req, res) => {
        res.render('account', { user: req.user });
    },
];
