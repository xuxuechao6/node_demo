const userInfo = require('../../models/index').users;
const crypto = require('crypto');


/**
 * 登录验证
 *
 */
const login = function (req, res, next) {
    const param = req.body;
    console.log(param)
    //=================================================
    const hash = crypto.createHash("md5");
    hash.update(param.password);          //直接对"123456"字符串加密
    const encode = hash.digest('hex');
    console.log(encode)
    //===================================================
    console.log("得到输入的账号和密码:" + param.username + encode);
    userInfo.find(param.username)
        .then(user => {
            console.log("user", user)
            if (user.length > 0) {
                const _password = user[0].password
                if (_password === param.password) {
                    console.log("密码正确")
                    res.json({"result": user[0]})
                } else {
                    console.log("密码错误")
                    res.json({"result": {"errInfo": "密码错误"}})
                }
            }


        })
        .catch(err => {
            console.log("系统错误！！！" + err)
        });

}

//检测用户名是否存在
const checkUserName = function (req, res, next) {
    const _userName = req.body.userName;
    console.log("用户名", _userName)
    userInfo.checkUserName(_userName)
        .then(user => {
            console.log("user", user)
            if (user.length > 0) {
                res.json({"result": {"status": false}})
            } else {
                res.json({"result": {"status": true}})
            }
        })
        .catch(err => {
            console.log("系统错误！！！" + err)
        });
}

//检测邮箱是否被注册

const checkEmail = function (req, res, next) {
    const _email = req.body.email;
    console.log("邮箱号", _email)
    userInfo.checkEmail(_email)
        .then(result => {
            console.log("user", result)
            if (result.length > 0) {
                res.json({"result": {"status": false}})
            } else {
                res.json({"result": {"status": true}})
            }
        })
        .catch(err => {
            console.log("系统错误！！！" + err)
        });
}

const register = function (req, res, next) {
    const param = req.body;
    console.log(param)
    //=================================================
    const hash = crypto.createHash("md5");
    hash.update(param.password);          //直接对"123456"字符串加密
    const encode = hash.digest('hex');
    console.log(encode)
    //===================================================
    console.log("得到输入的账号和密码:" + param.username + encode);
    userInfo.checkEmail(param.email)
        .then(result => {
            if (result.length > 0) {
                res.json({"result": {"status": false}})
                return false;
            }
        })
    userInfo.checkUserName(param.userName)
        .then(result => {
            if (result.length > 0) {
                res.json({"result": {"status": false}})
                return false;
            }
        })
    userInfo.register(param.username, encode, param.email)
        .then(result => {
            if (result.affectedRows > 0) {
                res.json({"result": {"status": true}})

            } else {
                res.json({"result": {"status": false}})
            }
        })
        .catch(err => {
            console.log("系统错误！！！" + err)
        });

}

exports.login = login;
exports.checkUserName = checkUserName;
exports.checkEmail = checkEmail;
exports.register = register;
