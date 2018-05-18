/**
 * Created by a on 2017/11/24.
 */


(function () {

var slide = {
    init:function(obj) {
//透明度方式
        var i = 0, s = 0;
        var toggle = obj.toggle || "fade";
        switch (toggle){
            case "horizontal":dir_LR();break;
            case "vertical":dir_UD();break;
            case "fade":auto_dio();break;
        }
        function auto_dio() {
            //自动轮播
            var time = setInterval(fun1, 2000);
            var times = setInterval(fun2, 2000);
            //点击透明度
            $(document).on("click", ".btn", function () {
                imgs = $("figure");
                imgs_len = $("figure").length;
                clearInterval(times);
                clearInterval(time);
                for (var i = 0; i <= imgs_len; i++) {
                    if (this == $(".btn")[i]) {
                        opacity(i);
                        $(this).css("background-color", "orange").siblings().css("background-color", "black");
                    }
                }
            })
        }
        function fun1() {
            imgs = $("figure");
            i++;
            if (i < imgs.length) {
                opacity(i % 5)
            } else {
                i = 0
                opacity(i % 5)
            }
        }
        //透明度
        function opacity(x) {
            imgs.eq(x).fadeIn().siblings().fadeOut();
        }
        function fun2() {
            btn = $(".btn");
            s++;
            dian(i % 5,"orange");
            dian((i - 1) % 5,"black");
        }
        //点点移动
        function dian(x,y) {
            btn.eq(x).css("background-color",y);
        }

//手风琴和上下切换
        function Mdown() {
            $("#banner").on("mousedown", function () {
                var e = window.event || arguments[0];
                clickX = e.clientX;
                clickY = e.clientY;
            });
        }

        function dir_LR() {
            Mdown()
            $("#banner").on("mouseup", function () {
                var we = window.event || arguments[0];
                var clickXx = we.clientX;
                var clickYy = we.clientY;
                    if (clickXx - clickX > 200) {
                        //右移動
                        console.log("右边")
                        imgs = $("figure");
                        // console.log(imgs);
                        var index = imgs.length;
                        i++;
                        if (i < index) {
                            dir_lr(i % index,"fast","slow")
                        } else {
                            i = 0;
                            dir_lr(i % index,"fast","slow")
                        }
                    } else if (clickX - clickXx > 200) {
                        //左移動
                        console.log("左边")
                        imgs = $("figure");
                        var index = imgs.length
                        i--;
                        if (i < 0) {
                            i = index - 1;
                            dir_lr(i % index - 1,"slow","fast")
                        } else {
                            dir_lr(i % index - 1,"slow","fast")
                        }
                    }
                });
                }
        function dir_UD() {
                    Mdown()
                    $("#banner").on("mouseup", function () {
                        var we = window.event || arguments[0];
                        var clickXx = we.clientX;
                        var clickYy = we.clientY;
                        if (clickYy - clickY > 200) {
                            //下移動
                            console.log("下边")
                            imgs = $("figure");
                            var index = imgs.length
                            i++;
                            if (i < index) {
                                dir_ud(i % index,"fast","slow")
                            } else {
                                i = 0;
                                dir_ud(i % index,"fast","slow")
                            }
                        } else if (clickY - clickYy > 200) {
                            //上移動
                            console.log("上边");
                            imgs = $("figure");
                            var index = imgs.length
                            i--;
                            if (i < 0) {
                                i = index - 1;
                                dir_ud(i % index - 1,"slow","fast")
                            } else {
                                dir_ud(i % index - 1,"slow","fast")
                            }
                        }
                    })
                }
        function dir_lr(x,y,z) {
                imgs.eq(x).animate({width: "800px"}, y).siblings().animate({width: "0"}, z);
            }
        function dir_ud(x,y,z) {
            // imgs.eq(x).slideDown().stop().siblings().slideUp();
            imgs.eq(x).animate({height: "500px"}, y).siblings().animate({height: "0"}, z);

        }
    }
}
    window.slide = {init:slide.init};
})()


// window.onload = slide.init ({
//     toggle:"fade"      //horizontal(水平)，vertical（垂直），fade（透明度）
// });
//滑动模式
//    (function () {
//
//        (function init() {
//            if(swipe) {
//                slider.on('mousedown touchstart', swipeStart);
//                $('html').on('mouseup touchend', swipeEnd);
//                $('html').on('mousemove touchmove', swiping);
//            }
//
//        })();
//
//
//
//    })()