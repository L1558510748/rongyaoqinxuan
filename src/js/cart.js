class Cart{
    constructor() {
        this.quit=document.getElementById("quit");
        this.user="";
        this.addEvent();
    }
    addEvent(){
        var that=this;
        this.quit.onclick=function () {
            that.logout()
          }
        this.check();
        this.init();
    }
    logout(){
        sessionStorage.removeItem("user");
        location.reload();
    }
    check(){
        var user=sessionStorage.getItem("user");
        if(user){
            console.log($("#username").html())
            $(".user_info").css("display","none");
            $(".logined").css("display","block");
            $("#username").html(JSON.parse(user).sucMsg)
            this.user=JSON.parse(user).sucMsg;
        }
    }
    init(){
        $.ajax({
            type: "get",
            url: "http://localhost/rongyaoqinxuan/src/static/php/cart.php",
            data: {user:this.user},
            success: function (response) {
                
            }
        });
    }
}
new Cart()