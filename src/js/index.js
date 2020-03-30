// $(document).ready(function () {
//     var t = 0;
//     setInterval(() => {
//         if (t == $(".box>ul>li").length) {
//             t = 0;
//             $(".box>ul").css("top", 0)
//         } else {
//             $(".box>ul").animate({ top: -36 * t + "px" },500)
//             t++;
//         }
//     }, 3000);
//     $(".list").children("li").click(function(){
//         $(this).addClass("active").siblings().removeClass("active");
//         $("html").animate({
//             scrollTop:$(".floor").eq($(this).index()).offset().top
//         })
//     })
//     $("#fixed_top").css("display","none");
//     $("#fixed_top").click(function(e){
//         $("body,html").animate({scrollTop:'0'},500);
//         return false
//     })
//     onscroll=function () {
//         console.log($(document).scrollTop())
//         if(200<$(document).scrollTop()){
//             $(".floor_list").css("right","0px");
//             $("#fixed_top").css("visibility","visible");
//             $("#fixed_top").fadeIn(500);           
//         }
//         else{
//             $(".floor_list").css("right","-86px");
//             $("#fixed_top").fadeOut(500);
//             console.log("width"+$(".floor_list").width())
//         }
//       }
// })
class Index {
    constructor() {
        this.box = $(".box");
        this.top = $("#fixed_top");
        this.quit=document.getElementById("quit");
        
        this.addEvent();
    }
    addEvent() {
       $(".row1 figure").click(function () {
           console.log($(this));
           alert(1)
         })
        var that=this;
        this.check();
        this.quit.onclick=function () {
            that.exit();
          }
        onscroll = this.pagescroll;
        $(this.top).click(this.scrolltop);
        this.boxscroll();
        this.list();
        this.init();
    }
    exit(){
        sessionStorage.removeItem("user");
        location.reload();
    }
    check(){
        var user=sessionStorage.getItem("user");
        if(user){
            console.log(JSON.parse(user).sucMsg)
            $(".user_info").css("display","none");
            $(".logined").css("display","block");
            $("#username").html(JSON.parse(user).sucMsg)
        }
    }
    scrolltop(){
        $("html,body").animate({scrollTop:'0'},500);
        // return false
    }
    pagescroll() {
        if (200 < $(document).scrollTop()) {
            $(".floor_list").css("right", "0px");
            $("#fixed_top").css("visibility", "visible");
            $("#fixed_top").fadeIn(500);
        }
        else {
            $(".floor_list").css("right", "-86px");
            $("#fixed_top").fadeOut(500);
        }
    }
    boxscroll() {
        var t = 0;
        setInterval(() => {
            if (t == $(".box>ul>li").length) {
                t = 0;
                $(".box>ul").css("top", 0)
            } else {
                $(".box>ul").animate({ top: -36 * t + "px" }, 500)
                t++;
            }
        }, 3000);
    }
    list() {
        $(".list").children("li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $("html").animate({
                scrollTop: $(".floor").eq($(this).index()).offset().top
            })
        })
    }
    init(){
        var that=this;
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/goods.json",
            function (data) {
                console.log(data)
                var str1="";
                var str2="";
                for(var i=0;i<data.length;i++){
                    // if(i<3){
                        str1+=`<figure id="${data[i].goods_id}"><img src=${data[i].img}>
                    <figcaption><p class="yc">${data[i].name}</p>
                    <p><span id="nowprice">￥${data[i].nowprice}</span ><span id="beforeprice"><s>￥${data[i].beforeprice}</s></span></p></figcaption>
                    </figure>`;
                    
                }
                $(".row1").html(str1);
                that.figclick();
            }
        );
       
    }
    figclick(){
        $("figure").click(function () {
            var gid=($(this).attr("id"));
            console.log(gid)
            $(window).attr('location',"./html/productdetail.html?id="+gid)
          })
    }
}
new Index();
