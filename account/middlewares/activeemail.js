const md5 = require('md5');
const email = require('../models/index').email;

//得到token值
async function getToken(options) {
    const reg_date = new Date().getTime();
    const email = options;
    const token = md5(email+reg_date);
    let data ={
        "email":email,
        "reg_date":reg_date,
        "token":token
    };
    const _result = await checkTokenByEmail(data);
   if(!_result){
       const _result1 = await saveToken(data);
       if(_result1){
           console.log("saveToken:",token)
           return token
       }else{
           return false
       }
   }else{
       const _result2 = await updateToken(data);

       if(_result2){
           console.log("updateToken:",token)
           return token
       }else{
           return false
       }
   }

};


//保存token值
async function saveToken (data) {
    const result = await email.saveToken(data);
    if(result.affectedRows > 0) {
        return true
    } else {
        return false
    }
}

async function checkTokenByEmail(data) {
    console.log(3333333,data)
    const result = await email.checkTokenByEmail(data.email)
    console.log("result2",result)
    if(result.length > 0){
            return true
    }else {
        return false
    }
}


const isValidToken = function (data) {
    console.log("data",data)
    if(!data || !data.token || !data.reg_date || data.is_active){
        return false
    }
    const reg_date = parseInt(data.reg_date)+86400000;
    const now = new Date().getTime();
    if(now < reg_date) {
        return true
    }else{
        return false
    }

}

async function updateToken(data) {
    const result = await email.updateToken(data);
    console.log(1111)
    if(result.affectedRows > 0) {
        console.log(3333)
        return true
    } else {
        console.log(2222)
        return false
    }
}

async function checkToken(data) {
    const result = await email.checkToken(data)
    console.log("result2",result)
    if(result.length > 0){
        if(isValidToken(result[0])){
            return true
        }else{
            return false
        }
    }else {
        return false
    }
}

async function checkPwdToken(data) {
    const result = await email.checkToken(data)
    console.log("result2",result)
    if(result.length > 0){
            return true
    }else {
        return false
    }
}

async function activeAccount(data) {
    const result =await email.activeAccount(data)
    console.log("result3",result)
    if(result.affectedRows > 0){
            return true
    }else {
        return false
    }
}

exports.getToken =getToken
exports.updateToken =updateToken
exports.checkToken =checkToken
exports.checkPwdToken =checkPwdToken
exports.activeAccount =activeAccount