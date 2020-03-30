$(document).ready(function () {
    $(".box").find("li").click(function(){
        // 先取消所有，再给当前加
        // 先给当前加，然后取消其他兄弟
        // 此处的this，默认找到的是原生js的DOM对象
        // console.log(this);
        // 如果想使用jq的方法，需要先转成jq的DOM对象
 
        $(this).addClass("active").siblings().removeClass("active");
 
        $(".content").children("div").css("display","none").eq($(this).index()).css("display","block");
 
    })
});