class Login {
    constructor() {
        this.box = $(".box");
        this.addEvent();
        this.user=$("#user");
        this.pw=$("pw");
        this.reuser=$("reuser");
        this.repw=$("repw");
        this.loginbtn=$("#loginbtn");
        this.registerbtn=$("#registerbtn");
        this.url="http://localhost/rongyaoqinxuan/src/static/php/login.php"
    }
    addEvent() {
        this.box.find("li").click(this.tab);
        $("#loginbtn").click(this.login);
        $("#registerbtn").click(this.register);
    }
    tab(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".content").children("div").css("display", "none").eq($(this).index()).css("display", "block");
    }
    login(){
        var reg1=/^[A-Za-z0-9]{6,10}$/;
        if(!reg1.test($(user).val())){
            alert("账号格式错误"+$(user).val());
        }
        var reg2=/^[A-Za-z0-9\.]{6,10}$/;
        if(!reg2.test($(pw).val())){
            alert("密码格式错误")
        }
        if(reg2.test($(pw).val())&&reg1.test($(user).val()))
        $.ajax({
            type: "post",
            url: "http://localhost/rongyaoqinxuan/src/static/php/login.php",
            data: {
                user:$(user).val(),
                pw:$(pw).val()
            },
            success: function (response) {
                response=JSON.parse(response);
                if(response.code==1){
                    sessionStorage.setItem("user",JSON.stringify(response));
                    location.href="./../index.html"
                }else if(response.code==2){
                    alert("密码错误");
                }else{
                    alert("账号不存在")
                }
            }
        });

    }
    register(){
        var reg1=/^[A-Za-z0-9]{6,10}$/;
        if(!reg1.test($(reuser).val())){
            alert("账号格式错误"+$(user).val());
        }
        else{
             var reg2=/^[A-Za-z0-9\.]{6,10}$/;
        if(!reg2.test($(repw).val())){
            alert("密码格式错误")
        }
        $.ajax({
            type: "post",
            url: "http://localhost/rongyaoqinxuan/src/static/php/register.php",
            data: {
                user:$(reuser).val(),
                pw:$(repw).val()
            },
            // dataType: "dataType",
            success: function (response) {
                response=JSON.parse(response);//code 0 成功 1,已存在
                if(response.code==1){
                    alert("注册成功");
                    location.href="./../index.html";
                }else{
                    alert("注册失败。用户名已存在")
                }
            }
        });
        }
       
        
    }
}
new Login();