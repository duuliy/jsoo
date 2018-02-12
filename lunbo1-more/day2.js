/**
 * Created by a on 2017/11/23.
 */

(function () {
    var index=0;
    var str1=document.getElementsByClassName("col");
    var strr;
    var st='';

    slide={
        change:function () {
            $(document).on("click",".col",function () {
                for(var i=1;i<=str1.length;i++){
                    strr= '<img src="img/'+i+'.jpg" alt="">'
                    st+=strr;
                }
                $("body").html("").css("background-color","gray");
                var str=
                    '<div id="warp">'+
                    st+
                    '</div>'+
                    '<img id="pre" src="img/toPre.png" alt="">'+
                    '<img id="next" src="img/toNext.png" alt="">'+
                    '<img id="mycha" src="img/close.png" alt="">';
                $("body").append(str)
                index =$(this).index();
                $($("#warp>img")[index]).fadeIn().siblings().fadeOut();
            })
        },
        pre:function () {
            $(document).on("click","#pre",function () {
                index--
                var imgs=$("#warp>img");
                if(index<0){
                    index=imgs.length-1
                }
                imgs.eq(index).fadeIn(200).siblings().fadeOut(200);

            })
        },
        next:function () {
            $(document).on("click","#next",function () {
                index++
                var imgs=$("#warp>img");
                if(index>imgs.length-1){
                    index=0
                }
                imgs.eq(index).fadeIn(200).siblings().fadeOut(200);

            })
        },
        close:function () {
            $(document).on("click","#mycha",function () {
                window.location="day2.html";
            })
        }
    };
    window.slide = {change:slide.change,pre:slide.pre,next:slide.next,close:slide.close}
})()

window.onload = slide.change();
window.onload = slide.pre();
window.onload = slide.next();
window.onload = slide.close();