$(document).ready(function () {
    var t = 0;
    setInterval(() => {
        if (t == $("li").length) {
            t = 0;
            $("ul").css("top", 0)
        } else {
            $("ul").animate({ top: -36 * t + "px" },500)
            t++;
        }
        console.log(document.getElementsByTagName("ul")[0].style.top)
    }, 3000);
})