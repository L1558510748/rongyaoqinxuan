class Detail {
    constructor() {
        this.id = this.getUrlParam("id");
        this.reduce=$("#reduce");
        this.increase=$("#increase");
        this.goodsid="";
        this.user="";
        this.num=1;
        this.index=0;
        this.data={};
        this.quit=document.getElementById("quit");
        this.addEvent();
    }
    addEvent() {
        this.check();
        var that=this;
        $("#cart").click(function () {
            that.cart()
          })
        this.quit.onclick=function () {
            alert(1)
            that.exit();
          }
          console.log($("#quit").html())
        $(".bigpic").mouseover(function () { 
            that.over();
        });
        $(".bigpic").mousemove(function (e) { 
            // values: e.clientX, e.clientY, e.pageX, e.pageY
            that.move(e);
        });
        $(".bigpic").mouseout(function () { 
            that.out();
        });
        var that=this;
        this.getdata();
        $(this.reduce).click(function () {
            if(0<that.num)
            $("#num").html(--that.num)
          })
        $(this.increase).click(function () {
            $("#num").html(++that.num)
          })
        $(".smallpic").find("img").click(function () {
            var imgurl=($(this).attr("src"));
            console.log($(this).addClass("active").siblings().removeClass("active"))
            $(".bigpic").find("img").attr("src",imgurl)
            $(".scrollpic").find("img").attr("src",imgurl)
          });
          
    }
    cart(){
        $.ajax({
            type: "post",
            url: "http://localhost/rongyaoqinxuan/src/static/php/cart.php",
            data: {user:this.user,
                goodsid:this.id,
                price:this.data.nowprice,
                imgsrc:this.data.img1,
                num:$("#num").html()*1,
                goodsname:this.data.name
            },
            success: function (response) {
                console.log(response)
            }
        });
    }
    check(){
        var user=sessionStorage.getItem("user");
        if(user){
            console.log(JSON.parse(user).sucMsg)
            $(".user_info").css("display","none");
            $(".logined").css("display","block");
            $("#detusername").html(JSON.parse(user).sucMsg)
            this.user=JSON.parse(user).sucMsg;
        }
    }
    exit(){
        sessionStorage.removeItem("user");
        location.reload();
    }
    over(){
        $(".hoverpic").css("display","block");
        $(".scrollpic").css("display", "block");
    }
    move(e){
        // console.log($('.hoverpic').width())
        var l=e.pageX-$(".bigpic").offset().left-54;
        var t=e.pageY-$(".bigpic").offset().top-54;
        if(l<0)l=0;
        if(t<0)t=0;
        if(l>$('.bigpic').width()-$(".hoverpic").width()){
            l=$('.bigpic').width()-$(".hoverpic").width();
        }
        if(t>$('.bigpic').height()-$(".hoverpic").height()){
            t=$('.bigpic').height()-$(".hoverpic").height();
        }
        $(".hoverpic").css("left",l+"px");
        $(".hoverpic").css("top",t+"px");
        var x=l/($(".bigpic").width()-$(".hoverpic").width());
        var y=t/($(".bigpic").height()-$(".hoverpic").height());
        $("#sc1").css("left",($(".scrollpic").width()-$("#sc1").width())*x+"px")
        $("#sc1").css("top",($(".scrollpic").height()-$("#sc1").height())*y+"px")
        
    }
    out(){
        $(".hoverpic").css("display","none");
        $(".scrollpic").css("display","none");
    }
    getdata(){
        var that=this;
       
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/goods.json",
            function (data) {
                // that.data=data;
                for(var k=0;k<data.length;k++){
                   
                    if(data[k].goods_id===that.id){
                        that.index=k;
                        console.log(k);
                        that.data=data[k]
                        that.init();

                        break;
                    }
                }
            }
        );
        $("#product_name").html()
    }
    init(){
        console.log(this.data)
        $("#product_name").html(this.data.name);
        $(".goods_name").html(this.data.name);
        $("#price").html("￥"+this.data.nowprice);
        $("#bp1").attr("src",this.data.img1);
        $("#sp1").attr("src",this.data.img1);
        $("#sp2").attr("src",this.data.img2);
        $("#sp3").attr("src",this.data.img3);
        $("#sc1").attr("src",this.data.img1);
        
    }
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);  //返回参数值
    }
}
new Detail();