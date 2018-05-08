var username = $('#username').val();
var token = $('#token').val();
var password = $('#password');
var password2 = $('#password2');
var isPassword = false;
var isPassword2 = false;

var resultModal =$('#resultModal')


password.find(".form-control").blur(function(){
    checkPassword()
});
password2.find(".form-control").blur(function(){
    checkPassword2()
});


function checkPassword(){
    //只能输入6-20个字母、数字、下划线
    var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
    var _password= password.find(".form-control").val()
    if(_password === ""){
        password.find(".err_info").text("请输入密码")
        password.find(".input-sign").children(".icon-duigou").css("display","none")
        password.find(".input-sign").children(".icon-cuowu").css("display","none")
        isPassword = false
    }else if(!reg.test(_password)){
        password.find(".err_info").text("密码至少包含数字，符号和字母中的两种且长度为6-20位")
        password.find(".input-sign").children(".icon-duigou").css("display","none")
        password.find(".input-sign").children(".icon-cuowu").css("display","block")
        isPassword = false
    }else{
        password.find(".err_info").text("")
        password.find(".input-sign").children(".icon-cuowu").css("display","none")
        password.find(".input-sign").children(".icon-duigou").css("display","block")
        isPassword = true
    }
}
function checkPassword2(){
    var _password= password.find(".form-control").val()
    var _password2= password2.find(".form-control").val()
    if(_password2 === ""){
        password2.find(".err_info").text("请再次输入密码")
        password2.find(".input-sign").children(".icon-duigou").css("display","none")
        password2.find(".input-sign").children(".icon-cuowu").css("display","none")
        isPassword2 = false
    }else if(_password2 !== _password){
        password2.find(".err_info").text("两次密码输入不一致")
        password2.find(".input-sign").children(".icon-duigou").css("display","none")
        password2.find(".input-sign").children(".icon-cuowu").css("display","block")
        isPassword2 = false
    }else{
        password2.find(".err_info").text("")
        password2.find(".input-sign").children(".icon-cuowu").css("display","none")
        password2.find(".input-sign").children(".icon-duigou").css("display","block")
        isPassword2 = true
    }
}
function checkUserInfo(){
    if(!isPassword){
        checkPassword();
        password.find(".form-control").focus()
    }else if(!isPassword2){
        checkPassword2();
        password2.find(".form-control").focus()
    }else if(username&&token) {
        var _data = {
            username:username,
            token:token,
            password:md5(password.find(".form-control").val()),
        }
        $.ajax({
            type: "POST",
            url: "/account/forgetPwd/resetPassword",
            data: _data,
            dataType : "json",
        })
            .success(function (result) {
                console.log(result)
                $(".result_info").text(result.result.info)
                resultModal.modal('show')
            })
            .error(function (err) {
                console.log(err)
                $(".result_info").text(result.info)
                $(".result_info").css("color","#ff0000")
                resultModal.modal('show')
            })

    }else{

    }


}


resultModal.on('hidden.bs.modal', function (e) {
    window.location.href="/account/login"
})



