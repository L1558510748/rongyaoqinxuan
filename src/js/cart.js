class Cart{
    constructor() {
        this.quit=document.getElementById("quit");
        this.addEvent();
    }
    addEvent(){
        var that=this;
        this.quit.onclick=function () {
            that.logout()
          }
        this.check();
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
        }
    }
}
new Cart()