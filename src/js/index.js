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
        console.log($(".box>ul>li").length)
    }, 3000);
    $('#menu>ul').find('li').click(function () {
        $(this).addClass('active').siblings().removeClass("active");
        console.log($(this))
        $(".content").children('div').css('display', 'none').eq($(this).index()).css('display', 'block');
    })
    
    $("#menu>ul").find("li").hover(function () {
            
            $("#menu2").css({"display":"block"})
            
        }, function () {
            // out
            $("#menu2").css({"display":"none"})
        })
    // );$("#menu2").css({"display":"block"})
    // document.getElementsByClassName("menu2")[0].style.display="block";
})