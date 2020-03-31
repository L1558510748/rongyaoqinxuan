class Detail {
    constructor() {
        this.id = this.getUrlParam("id");
        this.reduce=$("#reduce");
        this.increase=$("#increase");
        this.num=1;
        this.index=0;
        this.data={};
        this.addEvent();
    }
    addEvent() {
        var that=this;
        $(".bigpic").mouseover(function () { 
            that.over();
        });
        $(".bigpic").mousemove(function (e) { 
            // values: e.clientX, e.clientY, e.pageX, e.pageY
            that.move(e);
        });
        $(".bigpic").mouseout(function () { 
            that.out();
        });
        var that=this;
        this.getdata();
        $(this.reduce).click(function () {
            if(0<that.num)
            $("#num").html(--that.num)
          })
        $(this.increase).click(function () {
            $("#num").html(++that.num)
          })
    }
    over(){
        $(".hoverpic").css("display","block");
        $(".srollpic").css("display", "block");
    }
    move(e){
        var l=e.pageX-$("")
    }
    getdata(){
        var that=this;
       
        $.getJSON("http://localhost/rongyaoqinxuan/src/static/goods.json",
            function (data) {
                // that.data=data;
                for(var k=0;k<data.length;k++){
                   
                    if(data[k].goods_id===that.id){
                        that.index=k;
                        console.log(k);
                        that.data=data[k]
                        that.init();

                        break;
                    }
                }
            }
        );
        $("#product_name").html()
    }
    init(){
        console.log(this.data)
        $("#product_name").html(this.data.name);
        $(".goods_name").html(this.data.name);
        $("#price").html("￥"+this.data.nowprice);
        $(".bigpic").find("img").attr("src",this.data.img1)
        $("#sp1").attr("src",this.data.img1)
        $("#sp2").attr("src",this.data.img2)
        $("#sp3").attr("src",this.data.img3)
    }
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
}
new Detail();