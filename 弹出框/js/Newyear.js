/**
 * Created by Administrator on 2018/2/7/007.
 */
$(function () {
    $(document).on('click', '.newYear_imgone', function(){
        $("#newYear_warp").hide();
        $('html,body').css('overflow','visible');
    })
    $('html,body').css('overflow','hidden');

})




    $(function () {
(function($){

    $(window).load(function() {

        $(".content_3").mCustomScrollbar({

            scrollInertia: 600,

            autoDraggerLength: false

        });
    });

})(jQuery);
})