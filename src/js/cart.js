class Cart{
    constructor() {
        this.quit=document.getElementById("quit");
        this.status=0;
        this.user="";
        this.price=0;
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
        var that=this;
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
                for(var i=0;i<response.length/6;i++){
                    console.log(i)
                    var total=response[i+2+k]*response[i+1+k];
                    str+=`<div id="${response[i+k]}"><ul><li><input type='checkbox'></li><li><span id="namespan"><img src="${response[i+3+k]}">${response[i+4+k]}</span></li><li id="price">${response[i+2+k]}</li><li><input type="button" value="-" id="reduce"><span id="goodnum">${response[i+1+k]}</span><input type="button" value="+" id="increase"></li><li id="total">${total}</li>
                <li ><span id="delete">删除</span></li></ul></div>`;
                k=k+5;
                }
                $(".cart_list").html(str)
                $("#goodnum").html();
                that.totalctrl();
            }
        });
       
    }
    totalctrl(){
        //
        $("[id=reduce]").click(function () {
            var num=$(this).parent().children("span").html()*1;
            if(1<num){
                num--;
                $(this).parent().children("span").html(num)
            $(this).parent().parent().children("#total").html(num*$(this).parent().parent().children("#price").html())
            }
            
          })
          $("[id=increase]").click(function () {
            var num=$(this).parent().children("span").html()*1;
                num++;
                $(this).parent().children("span").html(num)
            $(this).parent().parent().children("#total").html(num*$(this).parent().parent().children("#price").html())
            
        
          })
          $("[id=delete]").click(function () {
              console.log($(this).parent().parent().parent().html())
            $(this).parent().parent().parent().remove();
            
          })
    }

}
new Cart()