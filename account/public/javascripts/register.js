var userName = $('#userName');
var password = $('#password');
var password2 = $('#password2');
var email = $('#email');
var isUserName = false;
var isPassword = false;
var isPassword2 = false;
var isEmail = false;
var isAgreement = false;
userName.find(".form-control").blur(function(){
    checkUserName()
});
password.find(".form-control").blur(function(){
    checkPassword()
});
password2.find(".form-control").blur(function(){
    checkPassword2()
});
email.find(".form-control").blur(function(){
    checkEmail()
});

function checkUserName(){
    var reg = /[\u4e00-\u9fa5_a-zA-Z\d]{4,14}/;
    //var reg = /^([\u4e00-\u9fffa-zA-Z_]+[0-9]*)|([0-9]*[\u4e00-\u9fffa-zA-Z_]){4,16}$/;
    var reg2 = /^[0-9]*$/;
    var _userName= userName.find(".form-control").val()
    console.log(_userName)
    if(_userName === ""){
        console.log("用户名为空")
        userName.find(".err_info").text("请输入用户名")
        userName.find(".input-sign").children(".icon-duigou").css("display","none")
        userName.find(".input-sign").children(".icon-cuowu").css("display","none")
        isUserName = false
    }else if(!reg.test(_userName)){
        console.log("用户名格式错误")
        userName.find(".err_info").text("用户名仅支持中英文、数字和下划线,且不能为纯数字")
        userName.find(".input-sign").children(".icon-duigou").css("display","none")
        userName.find(".input-sign").children(".icon-cuowu").css("display","block")
        isUserName = false
    }else if(reg2.test(_userName)){
        console.log("纯数字",_userName)
        userName.find(".err_info").text("用户名仅支持中英文、数字和下划线,且不能为纯数字")
        userName.find(".input-sign").children(".icon-duigou").css("display","none")
        userName.find(".input-sign").children(".icon-cuowu").css("display","block")
        isUserName = false
    }else{
        $.ajax({
            method: "POST",
            url: "/account/checkUserName",
            data: { "userName":_userName }
        })
            .success(function( msg ) {
                if(msg.result.status){
                    userName.find(".err_info").text("")
                    console.log("用户名可以使用")
                    userName.find(".input-sign").children(".icon-cuowu").css("display","none")
                    userName.find(".input-sign").children(".icon-duigou").css("display","block")
                    isUserName = true
                }else {
                    console.log("用户名存在")
                    userName.find(".err_info").text("用户名已存在")
                    userName.find(".input-sign").children(".icon-cuowu").css("display","block")
                    userName.find(".input-sign").children(".icon-duigou").css("display","none")
                    isUserName = false
                }
            })
            .error(function (msg) {
                console.log("数据库查询错误")
                userName.find(".err_info").text("")
                isUserName = false
            });

    }
}
function checkPassword(){
    //只能输入6-20个字母、数字、下划线
    var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;

    var _password= password.find(".form-control").val()
    console.log(_password)
    if(_password === ""){
        console.log("密码为空")
        password.find(".err_info").text("请输入密码")
        password.find(".input-sign").children(".icon-duigou").css("display","none")
        password.find(".input-sign").children(".icon-cuowu").css("display","none")
        isPassword = false
    }else if(!reg.test(_password)){
        console.log("纯数字")
        password.find(".err_info").text("密码至少包含数字，符号和字母中的两种且长度为6-20位")
        password.find(".input-sign").children(".icon-duigou").css("display","none")
        password.find(".input-sign").children(".icon-cuowu").css("display","block")
        isPassword = false
    }else{
        password.find(".err_info").text("")
        console.log("密码可以使用")
        password.find(".input-sign").children(".icon-cuowu").css("display","none")
        password.find(".input-sign").children(".icon-duigou").css("display","block")
        isPassword = true
    }
}
function checkPassword2(){
    var _password= password.find(".form-control").val()
    var _password2= password2.find(".form-control").val()
    if(_password2 === ""){
        console.log("密码为空")
        password2.find(".err_info").text("请再次输入密码")
        password2.find(".input-sign").children(".icon-duigou").css("display","none")
        password2.find(".input-sign").children(".icon-cuowu").css("display","none")
        isPassword2 = false
    }else if(_password2 !== _password){
        console.log("再次输入密码错误")
        password2.find(".err_info").text("两次密码输入不一致")
        password2.find(".input-sign").children(".icon-duigou").css("display","none")
        password2.find(".input-sign").children(".icon-cuowu").css("display","block")
        isPassword2 = false
    }else{
        password2.find(".err_info").text("")
        console.log("密码可以使用")
        password2.find(".input-sign").children(".icon-cuowu").css("display","none")
        password2.find(".input-sign").children(".icon-duigou").css("display","block")
        isPassword2 = true
    }
}
function checkEmail(){
    var _email= email.find(".form-control").val()
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
    if(_email === ""){
        console.log("邮箱为空")
        email.find(".err_info").text("请输入邮箱号")
        email.find(".input-sign").children(".icon-duigou").css("display","none")
        email.find(".input-sign").children(".icon-cuowu").css("display","none")
        isEmail = false
    }else if(!reg.test(_email)){
        console.log("邮箱格式错误")
        email.find(".err_info").text("请输入正确的邮箱号")
        email.find(".input-sign").children(".icon-duigou").css("display","none")
        email.find(".input-sign").children(".icon-cuowu").css("display","block")
        isEmail = false
    }else{
        $.ajax({
            method: "POST",
            url: "/account/checkEmail",
            data: { "email":_email }
        })
            .success(function( msg ) {
                if(msg.result.status){
                    email.find(".err_info").text("")
                    console.log("邮箱号可以使用")
                    email.find(".input-sign").children(".icon-cuowu").css("display","none")
                    email.find(".input-sign").children(".icon-duigou").css("display","block")
                    isEmail = true
                }else {
                    console.log("邮箱号已被存在")
                    email.find(".err_info").text("邮箱号已被注册")
                    email.find(".input-sign").children(".icon-cuowu").css("display","block")
                    email.find(".input-sign").children(".icon-duigou").css("display","none")
                    isEmail = false
                }
            })
            .error(function (msg) {
                console.log("数据库查询错误",msg)
                console.log( "未知错误" );
                email.find(".err_info").text("")
                isEmail = false
            });

    }
}
function checkAgreement() {
    if (!$('.protocol_book').is( ":checked" )) {
        $(".protocol .err_info").text("请勾选“阅读并同意RT-Thread 用户服务协议”")
        isAgreement = false
    }else {
        $(".protocol .err_info").text("")
        isAgreement = true
    }
}
function checkUserInfo(){
    if(!isUserName){
        console.log(111)
        checkUserName();
        userName.find(".form-control").focus()
    }else if(!isPassword){
        console.log(222)
        checkPassword();
        password.find(".form-control").focus()
    }else if(!isPassword2){
        console.log(333)
        checkPassword2();
        password2.find(".form-control").focus()
    }else if(!isEmail){
        checkEmail();
        email.find(".form-control").focus()
    }else if (!isAgreement){
        checkAgreement();
    }else {
        $("#TencentCaptcha").click();
    }
}

