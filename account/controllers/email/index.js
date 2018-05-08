
const validationEmail = require('../../middlewares/validationemail');
const email = require('../../models/index').email;
const activeEmail = require('../../middlewares/activeemail');

const rePostEmail =function (req,res,next) {
    // 创建一个邮件对象
    const _email = req.body.email
    const _type = req.body.type
    const _username = req.body.username
    console.log("_email:",_email)
    console.log("_username:",_username)

    const getToken = activeEmail.getToken(_email);
    const postEmail = email.postEmail(_type)
        .then(email)
    Promise.all([
        getToken,
        postEmail
    ]).then(([token,email]) =>{
        console.log("token:",token)
        console.log("email:",email)
        if (email.length >0 && token !== null) {
            let url =""
            if(_type === "register"){
                url = req.headers.origin + "/account/register/ActivateAccount?token=" + token
            }else{
                url = req.headers.origin + "/account/forgetPwd/resetPassword?username=" + _username+"&token="+token
            }
            const _text = email[0].text.replace(/url/, '<p style="text-indent: 2em"><a href="'+url+'" target="_blank">'+url+'</a></p>')
            let mail = {
                from:'"'+email[0].from_username+'"'+email[0].from_email, // 发件人
                subject: email[0].subject,// 主题
                to: _email,// 收件人
                html:'<p>亲爱的用户 '+_username+'：您好！</p>' +_text // 邮件内容，HTML格式
            };
            validationEmail.sendEmail(mail)
                .then(result => {
                    console.log("result",result)
                    if (result != null) {
                        res.json({"result": {"status": true,code:"250"}})
                    } else {
                        res.json({"result": {"status": false,code:""}})
                    }
                })
                .catch(err => {
                    console.log("系统错误！！！" , err)
                    console.log("errCode" , err.responseCode)
                    res.json({"result": {"status": false,"code":err.responseCode,"response":err.response}})
                });
        }
    })
}

const checkEmailToken = function (req,res,next) {
    console.log(req.query)
    if (req.query.token && req.query.username){
        console.log("密码忘记")
        checkPwdToken(req,res,next)
    }else{
        console.log("激活账号")
        checkToken(req,res,next)
    }
}
async function checkPwdToken(req,res,next) {
    const result = await activeEmail.checkPwdToken(req.query.token);

    console.log(result,"req.query.token")

    if(result){
        const result2 = await activeEmail.getToken(req.query.username);
        console.log(result2,"req.query.token")
        req.session.resetPassword= {
            "tokenPwdInfo":true,
            "username":req.query.username,
            "token":req.query.token,
        }
        res.redirect("/account/forgetPwd/step3")
        }else{
        const result2 = await activeEmail.getToken(req.query.username);
        console.log(result2,"req.query.token")
        req.session.resetPassword= {
            "tokenPwdInfo":false,
            "username":req.query.username,
            "token":req.query.token,
        }
        res.redirect("/account/forgetPwd/step3")
    }
}
async function checkToken(req,res,next) {
    const result = await activeEmail.checkToken(req.query.token);
    console.log(result,"req.query.token")
    if(result){
        req.session.tokenInfo = true
        const result2 = await activeEmail.activeAccount(req.query.token);
        if(result2){
                res.redirect("/account/register/step3")
        }else{
            req.session.tokenInfo = false
            res.redirect("/account/register/step3")
            console.log("系统错误")
        }
    }else{
        req.session.tokenInfo = false
        res.redirect("/account/register/step3")
    }
}
exports.rePostEmail = rePostEmail;
exports.checkEmailToken = checkEmailToken;