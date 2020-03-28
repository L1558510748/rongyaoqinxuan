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
})