"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,a){return e&&_defineProperties(t.prototype,e),a&&_defineProperties(t,a),t}var Cart=function(){function t(){_classCallCheck(this,t),this.quit=document.getElementById("quit"),this.status=0,this.user="",this.all=0,this.price=0,this.data="",this.sum=0,this.addEvent()}return _createClass(t,[{key:"addEvent",value:function(){var t=this;this.quit.onclick=function(){t.logout()},this.check(),this.init()}},{key:"logout",value:function(){sessionStorage.removeItem("user"),location.reload()}},{key:"check",value:function(){var t=sessionStorage.getItem("user");t?(console.log($("#username").html()),$(".user_info").css("display","none"),$(".logined").css("display","block"),$("#username").html(JSON.parse(t).sucMsg),this.user=JSON.parse(t).sucMsg):(alert("请先登录!"),$(window).attr("location","./login.html"))}},{key:"init",value:function(){var i=this;$.ajax({type:"get",url:"http://localhost/rongyaoqinxuan/src/static/php/cart2.php",data:{user:this.user},success:function(t){if((t=t.split(",")).pop(),i.data=t,this.status=1,0<t.length){$(".tips").css("display","none"),$(".shoppingcart").css("display","block"),console.log(1111);for(var e="",a=1,n=0;n<t.length/6;n++){var l=t[n+2+a]*t[n+1+a];i.sum+=l,e+='<div id="'.concat(t[n+a],'"><ul><li><input type="checkbox"   ></li><li><span id="namespan"><img src="').concat(t[n+3+a],'"><b>').concat(t[n+4+a],'</b></span></li><li id="price">').concat(t[n+2+a],'</li><li><input type="button" value="-" id="reduce"><span id="goodnum">').concat(t[n+1+a],'</span><input type="button" value="+" id="increase"></li><li id="total" class="total">').concat(l,'</li>\n                <li ><span id="delete">删除</span></li></ul></div>'),a+=5}$(".cart_list").html(e),$("#goodnum").html(),i.totalctrl()}}})}},{key:"totalctrl",value:function(){for(var n=this,t=0,e=0;e<$(".total").length;e++)t+=+$(".total").eq(e).html();$("#allprice").html(t),$("[id=reduce]").click(function(){var t=+$(this).parent().children("span").html();if(1<t){t--,$(this).parent().children("span").html(t),$(this).parent().parent().children("#total").html(t*$(this).parent().parent().children("#price").html());for(var e=0,a=0;a<$(".total").length;a++)e+=+$(".total").eq(a).html();$.ajax({type:"post",url:"http://localhost/rongyaoqinxuan/src/static/php/cart4.php",data:{type:1,user:n.user,goodid:$(this).parent().parent().parent().attr("id"),num:t}}),$("#allprice").html(e)}}),$("[id=increase]").click(function(){var t=+$(this).parent().children("span").html();t++,$(this).parent().children("span").html(t),$(this).parent().parent().children("#total").html(t*$(this).parent().parent().children("#price").html());for(var e=0,a=0;a<$(".total").length;a++)e+=+$(".total").eq(a).html();$.ajax({type:"post",url:"http://localhost/rongyaoqinxuan/src/static/php/cart4.php",data:{type:1,user:n.user,goodid:$(this).parent().parent().parent().attr("id"),num:t}}),$("#allprice").html(e)}),$("[id=delete]").click(function(){console.log($(this).parent().parent().parent().html()),$(this).parent().parent().parent().remove(),console.log($(this).parent().parent().parent().attr("id")),console.log(n.user),$.ajax({type:"post",url:"http://localhost/rongyaoqinxuan/src/static/php/cart4.php",data:{type:0,user:n.user,goodid:$(this).parent().parent().parent().attr("id")},success:function(){}})}),$("[id=checkall]").click(function(){if(0==n.all){n.all=1,console.log($("[type=checkbox]").length);for(var t=0;t<$("[type=checkbox]").length;t++)$("[type=checkbox]")[t].checked=!0}else for(t=n.all=0;t<$("[type=checkbox]").length;t++)$("[type=checkbox]")[t].checked=!1}),$("#deleteall").click(function(){1==n.all&&($(".shoppingcart").remove(),console.log(n.data[0]),$.ajax({type:"post",url:"http://localhost/rongyaoqinxuan/src/static/php/cart3.php",data:{user:n.data[0]}}),n.status=0,$(".shoppingcart").css("display","none"),$(".tips").css("display","block"))})}}]),t}();new Cart;