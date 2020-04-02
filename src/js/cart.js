class Cart {
    constructor() {
        this.quit = document.getElementById("quit");
        this.status = 0;
        this.user = "";
        this.all = 0;
        this.price = 0;
        this.data = "";
        this.sum = 0;
        this.addEvent();
    }
    addEvent() {
        var that = this;
        this.quit.onclick = function () {
            that.logout()
        }
        this.check();
        this.init();


    }

    logout() {
        sessionStorage.removeItem("user");
        location.reload();
    }
    check() {
        var user = sessionStorage.getItem("user");
        if (user) {
            console.log($("#username").html())
            $(".user_info").css("display", "none");
            $(".logined").css("display", "block");
            $("#username").html(JSON.parse(user).sucMsg)
            this.user = JSON.parse(user).sucMsg;
        }
        else{
            alert("请先登录!")
            $(window).attr('location', "./login.html")
        }
    }
    init() {
        var that = this;
        $.ajax({
            type: "get",
            url: "http://localhost/rongyaoqinxuan/src/static/php/cart2.php",
            data: { user: this.user },
            success: function (response) {
                // console.log((response))
                response = response.split(",");
                // console.log(response)
                response.pop()
                // console.log(response.length)
                that.data = response;
                this.status = 1;
                if (0 < response.length) {
                    $(".tips").css("display", "none");
                    $(".shoppingcart").css("display", "block");
                    console.log(1111)

                    // $(".tips").css("display","none");
                    // $(".shoppingcart").css("display","block");
                    var str = "";
                    var k = 1;

                    for (var i = 0; i < response.length / 6; i++) {
                        // console.log(i)

                        var total = response[i + 2 + k] * response[i + 1 + k];
                        that.sum += total;
                        str += `<div id="${response[i + k]}"><ul><li><input type="checkbox"   ></li><li><span id="namespan"><img src="${response[i + 3 + k]}"><b>${response[i + 4 + k]}</b></span></li><li id="price">${response[i + 2 + k]}</li><li><input type="button" value="-" id="reduce"><span id="goodnum">${response[i + 1 + k]}</span><input type="button" value="+" id="increase"></li><li id="total" class="total">${total}</li>
                <li ><span id="delete">删除</span></li></ul></div>`;
                        k = k + 5;
                    }
                    $(".cart_list").html(str)
                    $("#goodnum").html();
                    that.totalctrl();
                }
            }
        });

    }
    totalctrl() {
        var that = this;
        var sum = 0
        for (var i = 0; i < $(".total").length; i++) {
            sum += $(".total").eq(i).html() * 1;
            
        }

        $("#allprice").html(sum);
        $("[id=reduce]").click(function () {
            var num = $(this).parent().children("span").html() * 1;
            if (1 < num) {
                num--;
                $(this).parent().children("span").html(num);
                $(this).parent().parent().children("#total").html(num * $(this).parent().parent().children("#price").html())
                var sum = 0;
                for (var i = 0; i < $(".total").length; i++) {
                    sum += $(".total").eq(i).html() * 1;
                    
                }
                $.ajax({
                    type: "post",
                    url: "http://localhost/rongyaoqinxuan/src/static/php/cart4.php",
                    data: {type:1,
                        user:that.user,
                        goodid:$(this).parent().parent().parent().attr("id"),
                        num:num},
                    
                });
                $("#allprice").html(sum);
            }

        })
        $("[id=increase]").click(function () {
            var num = $(this).parent().children("span").html() * 1;
            num++;
            $(this).parent().children("span").html(num)
            $(this).parent().parent().children("#total").html(num * $(this).parent().parent().children("#price").html())
            var sum = 0;
            for (var i = 0; i < $(".total").length; i++) {
                sum += $(".total").eq(i).html() * 1;
                
            }
            $.ajax({
                type: "post",
                url: "http://localhost/rongyaoqinxuan/src/static/php/cart4.php",
                data: {type:1,
                    user:that.user,
                    goodid:$(this).parent().parent().parent().attr("id"),
                    num:num},
                
            });
            $("#allprice").html(sum);

        })
        $("[id=delete]").click(function () {
            console.log($(this).parent().parent().parent().html())
            $(this).parent().parent().parent().remove();
            console.log($(this).parent().parent().parent().attr("id"))
            console.log(that.user)
            $.ajax({
                type: "post",
                url: "http://localhost/rongyaoqinxuan/src/static/php/cart4.php",
                data: {type:0,
                user:that.user,
                goodid:$(this).parent().parent().parent().attr("id")},
                success: function (response) {
                    
                }
            });
        })

        $("[id=checkall]").click(function () {
            if (that.all == 0) {

                that.all = 1;
                console.log($("[type=checkbox]").length)
                for (var i = 0; i < $("[type=checkbox]").length; i++) {
                    $("[type=checkbox]")[i].checked = true;
                }
            }
            else {

                that.all = 0
                for (var i = 0; i < $("[type=checkbox]").length; i++) {
                    $("[type=checkbox]")[i].checked = false;
                }
            }
        })
        $("#deleteall").click(function () {
            if (that.all == 1) {
                $(".shoppingcart").remove();
                console.log(that.data[0])
                $.ajax({
                    type: "post",
                    url: "http://localhost/rongyaoqinxuan/src/static/php/cart3.php",
                    data: { user: that.data[0] },

                });
                that.status = 0;
                $(".shoppingcart").css("display", "none");
                $(".tips").css("display", "block")
            }
        })
    }

}
new Cart()