"use strict";$(document).ready(function(){var n=0;setInterval(function(){n==$(".box>ul>li").length?(n=0,$(".box>ul").css("top",0)):($(".box>ul").animate({top:-36*n+"px"},500),n++),console.log($(".box>ul>li").length)},3e3),$("#menu>ul").find("li").click(function(){$(this).addClass("active").siblings().removeClass("active"),console.log($(this)),$(".content").children("div").css("display","none").eq($(this).index()).css("display","block")}),$("#menu>ul").find("li").hover(function(){$("#menu2").css({display:"block"})},function(){$("#menu2").css({display:"none"})})});