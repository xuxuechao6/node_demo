const userInfo = require('../../models/index').users;

const validationEmail = require('../../middlewares/validationemail');
const email = require('../../models/index').email;
const activeEmail = require('../../middlewares/activeemail');
const md5 = require('md5');


/**
 * 登录验证
 *
 */
async function login(req, res, next) {
    const param = req.body;
    console.log("得到输入的账号和密码:",param);
    const user = await userInfo.findByUsername(param.username);
    if (user.length > 0) {
        const encode = md5(param.password+user[0].salt);
        if (user[0].password === encode) {
            console.log("密码正确")
            const activeInfo = await isActive(user[0].email);
            if (activeInfo !== null) {
                console.log(activeInfo)
                if (activeInfo.is_active) {
                    req.session.userInfo  = user[0];
                    res.send({"result": {"status": true}})
                } else {
                    req.session.username = user[0].username;
                    req.session.email = user[0].email;
                    res.send({"result": {"status": false, "errInfo": 3}})
                }
            } else {
                res.send({"result": {"status": true, "errInfo": 3}})
            }
        } else {
            console.log("密码错误")
            res.send({"result": {"status": false, "errInfo": 2}})
        }
    } else {
        res.send({"result": {"status": false, "errInfo": 1}})
    }

}

// 验证号码是否激活
async function isActive(options) {
    console.log(options, "options")
    const result = await  email.getToken(options)
    if (result.length > 0) {
        console.log("jihuoxinxi", result[0])
        return result[0]
    } else {
        return null
    }
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

//注册
const register = function (req, res, next) {
    const param = req.body;

    //===================密码加密==============================
    const salt = Math.random().toString(36).substr(2).slice(2,8);
    console.log(salt)
    const encode = md5(param.password+salt)
    //===================================================

    const regDate = Date.parse(new Date());
    console.log("date", regDate)
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
    userInfo.register(param.username, encode, param.email,salt)
        .then(result => {
            if (result.affectedRows > 0) {
                req.session.username = param.username;
                req.session.email = param.email;
                res.json({"result": {"status": true}})
                const _email = req.body.email
                const _username = req.body.username
                const _type = "register"
                const _url = req.headers.origin
                console.log("_email:", _email)
                postEmail(_email, _username, _type,_url);
            } else {
                res.json({"result": {"status": false}})
            }
        })
        .catch(err => {
            console.log("系统错误！！！" + err)
        });

};
//发送修改密码邮件
const postEmail = function (_email, _username, type,_url) {
    // 创建一个邮件对象
    console.log(type,"type:",type==="forgetPwd")
    const getToken = activeEmail.getToken(_email);
    const postEmail = email.postEmail(type)
        .then(email)
    Promise.all([
        getToken,
        postEmail
    ]).then(([token, email]) => {
        console.log("token:", token)
        console.log("email:", email)
        if (email.length > 0 && token !== null) {
            let url =""
            if(type === "register"){
                url = _url + "/account/register/ActivateAccount?token=" + token
            }else{
                 url = _url + "/account/forgetPwd/resetPassword?username=" + _username+"&token="+token
            }
            const _text = email[0].text.replace(/url/, '<p style="text-indent: 2em"><a href="'+url+'" target="_blank">'+url+'</a></p>')
            let mail = {
                from: '"' + email[0].from_username + '"' + email[0].from_email, // 发件人
                subject: email[0].subject,// 主题
                to: _email,// 收件人
                html:'<p>亲爱的用户 '+_username+'：您好！</p>' +_text // 邮件内容，HTML格式
                //html: // 邮件内容，HTML格式
            };
            validationEmail.sendEmail(mail)
                .then(result => {
                    console.log("result", result)
                    if (result != null) {
                        console.log("邮件发送成功")
                    } else {
                        console.log("邮件发送失败")
                    }
                })
                .catch(err => {
                    console.log("系统错误！！！", err)
                    console.log("errCode", err.responseCode)
                    console.log("邮件发送失败")
                });
        }
    })
}



//修改密码验证邮箱
async  function postPwdEmail(req, res, next) {
    const _email = req.body.email
    const _isEmail =  await userInfo.checkEmail(_email);
    console.log("_isEmail",_isEmail)
    if (_isEmail.length>0){
        const _username = _isEmail[0].username
        const _type = "forgetPwd"
        const _url = req.headers.origin
        req.session.username = _username;
        req.session.email = _email;
        postEmail(_email, _username, _type,_url);
        res.json({"result": {"status": true}})
    } else{
        res.json({"result": {"status": false,"errInfo":"该邮箱未注册"}})
    }
}
async function resetPassword(req,res,next){
    const password = req.body.password
    const token = req.body.token
    const _token = req.session.resetPassword.token
    const username = req.body.username
    const _username = req.session.resetPassword.username


    console.log("newP",md5(md5("19930101.")+"24ef67"))
    if(password){
        if (token===_token && username===_username){
            console.log("password",password)
            //===================密码加密==============================
            const salt = Math.random().toString(36).substr(2).slice(2,8);
            console.log(salt)
            const encode = md5(password+salt)
            //===================================================
            const result = await userInfo.resetPassword(username,encode,salt)
            console.log("result:",result)
            if (result.affectedRows>0){
                res.json({"result": {"status": true,"info":"密码修改成功！！！"}})
            } else{
                res.json({"result": {"status": true,"info":"密码修改失败，请联系管理员"}})
            }

        }else{
            res.json({"result": {"status": false,"info":"链接不可用！！！"}})
        }
    }else{
        res.json({"result": {"status": false,"info":"非法操作！！！"}})
    }

}



exports.login = login;
exports.checkUserName = checkUserName;
exports.checkEmail = checkEmail;
exports.postPwdEmail = postPwdEmail;
exports.register = register;
exports.resetPassword = resetPassword;

