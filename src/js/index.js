$(document).ready(function () {
    var t = 0;
    setInterval(() => {
        if (t == $(".box>ul>li").length) {
            t = 0;
            $(".box>ul").css("top", 0)
        } else {
            $(".box>ul").animate({ top: -36 * t + "px" },500)
            t++;
        }
    }, 3000);
    $(".list").children("li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $("html").animate({
            scrollTop:$(".floor").eq($(this).index()).offset().top
        })
    })
    onscroll=function () {
        console.log($(document).scrollTop())
        if(100<$(document).scrollTop()){
            $(".floor_list").css("right","0px");
            console.log("width"+$(".floor_list").width())
        }
        else{
            $(".floor_list").css("right","-86px");
            console.log("width"+$(".floor_list").width())
        }
      }
})