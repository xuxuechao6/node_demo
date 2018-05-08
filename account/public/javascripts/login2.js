function checkCode(res){
    console.log(res)
    $('#userInfo').submit();
    //res（未通过验证）= {ret:1,ticket:null}
    //res（验证成功） = {ret:0,ticket:"String",randstr:"String"}
    // var _data ={
    //     username:document.getElementById("username").value,
    //     password:md5(document.getElementById("password").value),
    //     ticket:res.ticket
    // }
    // console.log("_data",_data)
    // if(res.ret === 0){
    //     $.ajax({
    //         type: "POST",
    //         url: "/account/login",
    //         data: _data,
    //         dataType : "json",
    //     })
    //         .success(function (res) {
    //             console.log(res.result)
    //             if(!res.result.status){
    //                 if(res.result.errInfo===1){
    //                     document.getElementById("usernameInfo").innerHTML="用户不存在";
    //                     document.getElementById("username").focus()
    //                 }else if(res.result.errInfo===2){
    //                     document.getElementById("passwordInfo").innerHTML="密码错误";
    //                     document.getElementById("password").focus()
    //                 }else if (res.result.errInfo ===3) {
    //                         window.location.href='/account/register/step2';
    //                 }
    //             }else{
    //                 window.location.href='/account/login/redirectTo';
    //             }
    //         })
    //         .error(function (err) {
    //            console.log("err:",err)
    //         });
    // }
}
