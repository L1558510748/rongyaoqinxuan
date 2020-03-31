class Cart{
    constructor() {
        this.quit=document.getElementById("quit");
        this.status=0;
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
            url: "http://localhost/rongyaoqinxuan/src/static/php/cart2.php",
            data: {user:this.user},
            success: function (response) {
                console.log((response))
               response= response.split(",");
                console.log(response)
                response.pop()
                console.log(response)
                this.status=1;
                $(".tips").css("display","none");
                $(".shoppingcart").css("display","block");
                var str="";
                var k=1;
                for(var i=0;i<response.length/5;i++){
                    console.log(i)

                    str+=`<div id="${response[i+k]}"><ul><li><input type='checkbox'></li><li><img src="${response[i+3+k]}"></li><li>${response[i+2+k]}</li><li><input type="button" value="-" id="reduce">${response[i+1+k]}<input type="button" value="+" id="increase"></li><li>555</li>
                <li>删除</li></ul></div>`;
                k=k+4;
                }
                $(".cart_list").html(str)
            }
        });
       
    }

}
new Cart()