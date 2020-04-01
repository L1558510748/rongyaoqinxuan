class Channel {
    constructor() {
        this.addEvent();
    }
    addEvent() {
        this.boxscroll();
        this.init();
        this.check();
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
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/goods.json",
            function (data) {
                console.log(data)
                var str1 = "";

                for (var i = 0; i < data.length; i++) {
                    
                    str1 += `<figure id="${data[i].goods_id}"><img src=${data[i].img}>
                            <figcaption><p class="yc">${data[i].name}</p>
                            <p><span id="nowprice">￥${data[i].nowprice}</span ><span id="beforeprice"><s>￥${data[i].beforeprice}</s></span></p></figcaption>
                            </figure>`;

                }
                $(".row1").html(str1);
                console.log(str1)
                that.figclick();
            }
        );

    }
    figclick() {
        $(".row1").children("figure").click(function () {
            var gid = ($(this).attr("id"));
            console.log(gid)
            $(window).attr('location', "./productdetail.html?id=" + gid)
        })
    }
    check(){
        var user=sessionStorage.getItem("user");
        if(user){
            console.log(JSON.parse(user).sucMsg)
            $(".user_info").css("display","none");
            $(".logined").css("display","block");
            // $("#detusername").html(JSON.parse(user).sucMsg)
            this.user=JSON.parse(user).sucMsg;
            $("#username").html(this.user)
        }
    }
}
new Channel()