class Channel {
    constructor() {
        this.id = this.getUrlParam("id");
        this.url="";
        this.imgs="";
        this.addEvent();
    }
    addEvent() {
        var that=this;
        this.boxscroll();
        this.init();
        this.check();
        this.id=this.getUrlParam("id");
        onscroll = function(){

            lazyImg(that.imgs);
    
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
    init() {
        var that = this;
        if(that.id=="qinxuan"){
            this.url="http://localhost/rongyaoqinxuan/src/static/goods.json";
            $("#title").html("亲选生态")
        }
        if(that.id=="zhihui"){
            this.url="http://localhost/rongyaoqinxuan/src/static/zhihui.json";
            $("#title").html("智慧屏系列")
        }
        if(that.id=="jingpin"){
            this.url="http://localhost/rongyaoqinxuan/src/static/jingpin.json";
            $("#title").html("精品推荐")
        }
        
        $.getJSON(this.url,
            function (data) {
                console.log(data)
                var str1 = "";

                for (var i = 0; i < data.length; i++) {
                    
                    str1 += `<figure id="${data[i].goods_id}"><img lazy=${data[i].img} class="lazy">
                            <figcaption><p class="yc">${data[i].name}</p>
                            <p><span id="nowprice">￥${data[i].nowprice}</span ><span id="beforeprice"><s>￥${data[i].beforeprice}</s></span></p></figcaption>
                            </figure>`;

                }
                $(".el_row").html(str1);
                // console.log(str1)
                that.imgs=document.querySelectorAll(".lazy")
                console.log(that.imgs.length)
                lazyImg(that.imgs);
                that.figclick();
            }
        );

    }
    figclick() {
        $(".el_row").children("figure").click(function () {
            var gid = ($(this).attr("id"));
            // console.log(gid)
            $(window).attr('location', "./productdetail.html?id=" + gid)
        })
    }
    check(){
        var user=sessionStorage.getItem("user");
        if(user){
            // console.log(JSON.parse(user).sucMsg)
            $(".user_info").css("display","none");
            $(".logined").css("display","block");
            // $("#detusername").html(JSON.parse(user).sucMsg)
            this.user=JSON.parse(user).sucMsg;
            $("#username").html(this.user)
            
        }
    }
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);  //返回参数值
    }
}
new Channel()