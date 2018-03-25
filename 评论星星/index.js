(function ($) {    
    $.fn.BindStars = function () {
        var starElement = $(this),
            txt = $('.text');
        starElement.children("i").addClass('onred');
        txt.text('很满意');
        starElement.children("i").on('click',function () {
            var curIndex = starElement.find("i").index(this);
            if(curIndex==0){
                  txt.text('很差');
            }else if(curIndex == 1){
                txt.text('不满意');
            }else if(curIndex == 2){
                txt.text('一般');
            }else if(curIndex == 3){
                txt.text('满意');
            }else if(curIndex == 4){
                txt.text('很满意');
            }
            starElement.find("i").each(function (index) {
                if (index <= curIndex) {
                    $(this).addClass("onred");
                }
                else {
                    $(this).removeClass("onred");
                }
            }); 
            starElement.attr("data-score", curIndex + 1);
        });
    };
    $.fn.SetStars = function (score) {
        var scoreStr = "";
        for (var i = 0; i < 5; i++) {
            if (i < score) {
                scoreStr += "<i class='onred'></i>";
            } else {
                scoreStr += "<i></i>";
            }
        } 
        $(this).html(scoreStr); 
    };
})(window.jQuery);