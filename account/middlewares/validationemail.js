//email.js

// 引入 nodemailer
const nodemailer = require('nodemailer');



// 发送邮件
exports.sendEmail = function (mail) {

    const config = {
        host: "smtp.ym.163.com",
        secureConnection: true,
        port: 994,
        secure: true,
        auth: {
            user: "xuxuechao@rt-thread.com", //刚才注册的邮箱账号
            pass: "xu.19930101"  //邮箱的授权码，不是注册时的密码
        }
    };
    // 创建一个SMTP客户端对象
    const transporter = nodemailer.createTransport(config);
    return new Promise((resolve, reject) => {
        transporter.sendMail(mail, (err, rows) => {
            if (err) {
                console.log("error:", err)
                reject(err)
            }
            else {
                console.log(rows)
                resolve(rows)
            }
        });
    });
};
