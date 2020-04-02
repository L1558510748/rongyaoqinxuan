class Index {
    constructor() {
        this.box = $(".box");
        this.top = $("#fixed_top");
        this.quit = document.getElementById("quit");
        this.imgs="";
			this.clientH=document.documentElement.clientHeight;
        this.addEvent();
    }
    addEvent() {
        var that=this;
        $(".row1 figure").click(function () {
            console.log($(this));

        })
        onscroll = function(){

                that.pagescroll();
                lazyImg(that.imgs);
        
                }
        var that = this;
        this.check();
        this.quit.onclick = function () {
            that.exit();
        }
        this.init();
        
        $(this.top).click(this.scrolltop);
        this.boxscroll();
        this.list();
        
    }
    // lazyImg(imgs){
        
    //     var arr=Array.from(imgs);
    //     var scrollT=document.documentElement.scrollTop;
    //     for(var i=0;i<arr.length;i++){
    //         if(arr[i].offsetTop - 100 < this.clientH + scrollT){
    //             arr[i].src=arr[i].getAttribute("lazy");
    //         arr.splice(i,1);
    //         i--;
    //         console.log("lazy")
    //         }
    //     }
    // }
    exit() {
        sessionStorage.removeItem("user");
        location.reload();
    }
    check() {
        var user = sessionStorage.getItem("user");
        if (user) {
            console.log(JSON.parse(user).sucMsg)
            $(".user_info").css("display", "none");
            $(".logined").css("display", "block");
            $("#username").html(JSON.parse(user).sucMsg)
        }
    }
    scrolltop() {
        $("html,body").animate({ scrollTop: '0' }, 500);
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
    init() {
        var that = this;
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/goods.json",
            function (data) {
                // console.log(data)
                var str1 = "";

                for (var i = 0; i < 8; i++) {
                    // if(i<3){
                    str1 += `<figure id="${data[i].goods_id}"><img lazy=${data[i].img} class="lazy">
                    <figcaption><p class="yc">${data[i].name}</p>
                    <p><span id="nowprice">￥${data[i].nowprice}</span ><span id="beforeprice"><s>￥${data[i].beforeprice}</s></span></p></figcaption>
                    </figure>`;

                }
                $(".row1").html(str1);
                // that.imgs=document.querySelectorAll(".lazy");
                // that.lazyImg(that.imgs);
                that.figclick();
            }
        );
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/zhihui.json",
            function (data) {
                var str2 = "";

                for (var i = 0; i < 8; i++) {
                    // if(i<3){
                    str2 += `<figure id="${data[i].goods_id}"><img lazy=${data[i].img}  class="lazy">
                <figcaption><p class="yc">${data[i].name}</p>
                <p><span id="nowprice">￥${data[i].nowprice}</span ><span id="beforeprice"><s>￥${data[i].beforeprice}</s></span></p></figcaption>
                </figure>`;

                }
                $(".row2").html(str2);
                that.figclick();
            }
        );
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/jingpin.json",
             (data)=> {
                var str3 = "";

                for (var i = 0; i < 8; i++) {
                    // if(i<3){
                    str3 += `<figure id="${data[i].goods_id}"><img lazy=${data[i].img} class="lazy">
                <figcaption><p class="yc">${data[i].name}</p>
                <p><span id="nowprice">￥${data[i].nowprice}</span ><span id="beforeprice"><s>￥${data[i].beforeprice}</s></span></p></figcaption>
                </figure>`;

                }
                $(".row3").html(str3);
                this.imgs=document.querySelectorAll(".lazy")
                console.log(this.imgs.length)
                this.arr=Array.from(this.imgs);
                lazyImg(this.imgs);
                that.figclick();
            }
        );
        
    }
    figclick() {
        $(".row1").children("figure").click(function () {
            var gid = ($(this).attr("id"));
            console.log(gid)
            $(window).attr('location', "./html/productdetail.html?id=" + gid)
        })
        $(".row2").children("figure").click(function () {
            var gid = ($(this).attr("id"));
            console.log(gid)
            $(window).attr('location', "./html/productdetail.html?id=" + gid)
        })
        $(".row3").children("figure").click(function () {
            var gid = ($(this).attr("id"));
            console.log(gid)
            $(window).attr('location', "./html/productdetail.html?id=" + gid)
        })
    }
}
new Index();
