class Banner {
    constructor() {
        this.index = -1;
        this.max = $('.imgbox').children().length - 1;
        this.addEvent();
    }
    addEvent() {
        var that = this;
        $("#right").click(function () {
            that.index++;
            console.log(that.index)
            if (that.index == that.max + 1) {
                that.index = 0;
            }
            $('.imgbox a').eq(that.index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        });
        $('#left').click(function () {
            that.index--;
            if (that.index == -1) {
                that.index = that.max;
            }
           
            $('.imgbox a').eq(that.index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        });
        this.autoplay();
    }

    autoplay() {
        setInterval(() => {
            this.index++;
            // console.log(this.index)
            if (this.index == this.max + 1) {
                this.index = 0;
            }
            $('.imgbox a').eq(this.index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        }, 5000)
    }
}
new Banner();