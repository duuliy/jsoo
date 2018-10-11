(function(){

    var t_img; // 定时器
    var isLoad = true; // 控制变量
    var img_height = 0;
    var img_box_height = 0;
    var h_diff = ''; // 右侧滑动的高度差

    /* 获取左右两个阅读框监听滚动 */
    var l=document.querySelector('.trans-before');
    var r=document.querySelector('.trans-after');
    var img_height_left = '';
    var img_height_right = '';
    var max_left_page = 1;
    var max_right_page = 1;
    var currentTab = '';

    /* 判断是否积分不足 */
    // if (haveScore == "0") {
    //     noscore(0,company);
    // }else if(haveScore == "1"){
    //     comFf(0,company,tid);
    // }else if(haveScore == "3"){
    //     ff();
    // }else if(haveScore == "5"){
        
    // }else{
    //     closeWindow();
    // }
        
    /* 禁止复制和拷贝 */
    $(document).bind("contextmenu copy selectstart", function() {
      return false;
    });

    showLeftImg(1,5);
    setTimeout(function(){
        showRightImg(1,5);
    },100)

    /* 判断图片加载的函数 */
    // function isImgLoad(callback){
    //     // 注意我的图片类名都是trans-img-list，因为我只需要处理trans-img-list。其它图片可以不管。
    //     // 查找所有封面图，迭代处理

    //     var list_length_left = $('#container1 .img-box').length;
    //     if (list_length_left > 0) {
    //         $('.trans-img-list').each(function(){
    //             // 找到为0就将isLoad设为false，并退出each
    //             if(this.height === 0){
    //                 isLoad = false;
    //                 // return false;
    //             }
    //         })
    //     }else{
    //         isLoad = false;
    //     }

    //     var list_length_right = $('#container2 .img-box').length;
    //     if (list_length_right > 0) {
    //         $('.trans-img-list').each(function(){
    //             // 找到为0就将isLoad设为false，并退出each
    //             if(this.height === 0){
    //                 isLoad = false;
    //                 // return false;
    //             }
    //         })
    //     }else{
    //         isLoad = false;
    //     }
        
    //     // 为true，没有发现为0的。加载完毕
    //     if(isLoad){
    //         clearTimeout(t_img); // 清除定时器
    //         // 回调函数
    //         callback();
    //     // 为false，因为找到了没有加载完成的图，将调用定时器递归
    //     }else{
    //         isLoad = true;
    //         t_img = setTimeout(function(){
    //             isImgLoad(callback); // 递归扫描
    //         },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    //     }
    // }

    /* 设置图片框的高度 */
    function setImgboxHeight(img_height){
        if (img_height > 0) {
            $(".img-box").height(img_height);
        }
    }

    /* 显示原文 */
    // function showLeftImg(start,end){ 
    //     var img_list_left = '';
    //     var base = getbasePath();
    //     if($.isEmptyObject(ossKey)){return ;}
    //     if($.isEmptyObject(tOssKey)){return ;}
    //     if($.isEmptyObject(pageCount)){return ;}
        
    //     $.ajax({
    //         url :  getbasePath()+'pdf/getUrlsByOssKey.htm',
    //         type : 'post',
    //         data : {
    //             ossKey:ossKey,
    //             id:tid,
    //             index:start
    //         },
    //         dataType : 'json',
    //         async:true,
    //         success : function(data){
    //             if (data) {
    //                 if (data.code == 1) {
    //                     $("#container1 .before-load").remove();
    //                     $.each(data.urls,function(i,item){
    //                     	item = item.replace('http://','https://');
    //                         img_list_left += '<div class="img-box">'
    //                             +'<span class="page">第'+(i+start)+'页</span>'
    //                             +'<image src="'+base+'resources/image/loading_bg.png" data-echo='+item+' class="trans-img-list lazy-load2" id="leftTo'+(i+start)+'"></div>';
    //                     })
    //                     $("#container1").append(img_list_left);

    //                     var container1=echoNew.initNew({
    //                         container:document.getElementById("container1"),
    //                         offset: 1000
    //                     }); 
    //                     container1.render();

    //                     $(".trans-before").css("background","#fff");

    //                     if (end < left_count) {
    //                         addMoreBurron("left");
    //                     }
    //                     if (img_height > 0) {
    //                         setImgboxHeight(img_height);
    //                     }else{
    //                         // 判断图片加载状况，加载完成后回调
    //                         isImgLoad(function(){
    //                             img_height = $("img.trans-img-list").eq(0).height();
    //                             img_box_height = img_height +10;
    //                             setImgboxHeight(img_height);
    //                         });
    //                     }
    //                     /* 预加载下一轮 */
    //                     var before_load =$("#container1 .img-box").length+1;
    //                     setTimeout(function(){
    //                         beforeLoad(ossKey,0,before_load);
    //                     },1000) 
    //                 }
    //             } 
    //         },
    //         error:function(data){
    //             // console.log(data.msg);
    //         }
    //     });
    // }

    /* 显示译文 */
    // function showRightImg(start,end){
    //     var img_list_right = '';
    //     if($.isEmptyObject(ossKey)){return ;}
    //     if($.isEmptyObject(tOssKey)){return ;}
    //     if($.isEmptyObject(pageCount)){return ;}
    //     if (end < right_count){
    //         end = end;
    //     }else{
    //         end = right_count;
    //     }
    //     var base = getbasePath();

    //     $.ajax({
    //         url :  getbasePath()+'pdf/getUrlsByOssKey.htm',
    //         type : 'post',
    //         data : {
    //             ossKey:tOssKey,
    //             id:tid,
    //             index:start
    //         },
    //         dataType : 'json',
    //         async:true,
    //         success : function(data){
    //             if (data) {
    //                 if (data.code == 1) {
    //                     $("#container2 .before-load").remove();
    //                     $.each(data.urls,function(i,item){
    //                     	item = item.replace('http://','https://');
    //                         img_list_right += '<div class="img-box">'
    //                             +'<span class="page">第'+(i+start)+'页</span>'
    //                             +'<image src="'+base+'resources/image/loading_bg.png" data-echo='+item+' class="trans-img-list lazy-load2" id="rightTo'+(i+start)+'"></div>';
    //                     })

    //                     $("#container2").append(img_list_right);

    //                     var container2=echoNew.initNew({
    //                         container:document.getElementById("container2"),
    //                         offset: 1000
    //                     }); 
    //                     container2.render();
    //                     $(".trans-after").css("background","#fff"); 

    //                     if (end < right_count) {
    //                         addMoreBurron("right");
    //                     }
    //                     if (img_height > 0) {
    //                         setImgboxHeight(img_height);
    //                     }else{
    //                         // 判断图片加载状况，加载完成后回调
    //                         isImgLoad(function(){
    //                             img_height = $("img.trans-img-list").eq(0).height();
    //                             img_box_height = img_height +10;
    //                             setImgboxHeight(img_height);
    //                         });
    //                     }
    //                     /* 预加载下一轮 */
    //                     var before_load =$("#container2 .img-box").length+1;
    //                     setTimeout(function(){
    //                         beforeLoad(tOssKey,1,before_load);
    //                     },1000)  
    //                 }
    //             } 
    //         },
    //         error:function(data){
    //             // console.log(data.msg);
    //         }
    //     });

    //     /*for(var i=start;i<=end;i++) {
    //         img_list_right += '<div class="img-box">'
    //             +'<span class="page">第'+i+'页</span>'
    //             +'<image src="'+base_path+'pdf/getByOssKey.htm?&ossKey='+tOssKey+'&index='+i+'" class="trans-img-list lazy-load2" id="rightTo'+i+'"></div>';
    //     }*/
    // }

    // 判断图片加载状况，加载完成后回调
    // isImgLoad(function(){
    //     img_height = $("img.trans-img-list").height();
    //     // img_height = document.getElementsByClassName("trans-img-list")[0].offsetHeight;
    //     img_box_height = img_height +10;
    //     setImgboxHeight(img_height);
    //     // console.log(img_height);
    // });

    /* 滑动原文控制译文滚动 */
    l.addEventListener('scroll', function(){
        if (currentTab !== 1) return;
        if (l.scrollTop <= 0 ) { 
            r.scrollTop = 0;
            h_diff = 0;
        }else{
            r.scrollTop = l.scrollTop -h_diff;
        }

        // if (img_box_height > 0) {
        //     var page = Math.ceil((r.scrollTop+300)/img_box_height);
        //     if (page == 0) {
        //          $("#rightPage").val(1);
        //     }else{
        //         $("#rightPage").val(page);
        //         if (max_right_page < page) {
        //             max_right_page = page;
        //         } 
        //     }
        // }else{
        //     img_box_height = 742;
        // }
    })

    r.addEventListener('scroll', function(){
        if (currentTab !== 2) return;
        h_diff = l.scrollTop - r.scrollTop;
        
        // if (img_box_height > 0) {
        //     var page = Math.ceil((r.scrollTop+300)/img_box_height);
        //     if (page == 0) {
        //          $("#rightPage").val(1);
        //     }else{
        //         $("#rightPage").val(page);
        //         if (max_right_page < page) {
        //             max_right_page = page;
        //         } 
        //     }
        // }else{
        //     img_box_height = 742;
        // }
    })

    l.addEventListener('mouseover',function(){
        // 1 表示表示当前鼠标位于 .left元素范围内
        currentTab = 1;
    })
    r.addEventListener('mouseover',function(){
        // 2 表示表示当前鼠标位于 .right元素范围内
        currentTab = 2;
    })

    /* 加载更多按钮 */
    // function addMoreBurron(whichBox){
    //     if (whichBox == 'right') {
    //         $(".trans-after").append('<div class="add-more add-more-right"><button>点击加载</button></div>');
    //     }else{
    //         $(".trans-before").append('<div class="add-more add-more-left"><button>点击加载</button></div>');
    //     }  
    // }

    /* 预加载函数 */
    // function beforeLoad(ossKey,type,start){
    //     $.ajax({
    //         url :getbasePath()+ 'pdf/loadingHighImg.htm',
    //         type : 'get',
    //         data : {
    //             ossKey:ossKey,
    //             type:type,
    //             index:start
    //         },
    //         dataType : 'json',
    //         success : function(data){
    //         }
    //     });
    // }

    /* 点击加载更多 */
    // $("body").on('click','.add-more-left',function(e){
    //     $(".add-more").remove();
    //     var left_start = $(".trans-before img").length+1;
    //     var left_end = left_start + 4;
    //     var right_start = $(".trans-after img").length+1;
    //     var right_end = right_start + 4;
    //     // $(this).remove();
    //     if (left_start <= left_count && left_start >1) {
    //         $("#container1").append('<div class="img-box before-load"></div>');
    //         $("#container2").append('<div class="img-box before-load"></div>');
    //         showLeftImg(left_start,left_end);
    //         /*if ((left_start-1) % 2 == 1){
    //             var before_load = left_start + 10;
    //             setTimeout(function(){
    //                 beforeLoad(ossKey,0,before_load);
    //             },1000)  
    //         }*/
    //     }
    //     if (right_start <= right_count && right_start >1) {
    //         showRightImg(right_start,right_end);
    //         /*if ((right_start-1) % 2 == 1){
    //             var before_load = right_start + 10;
    //             setTimeout(function(){
    //                 beforeLoad(tOssKey,1,before_load);
    //             },1000) 
    //         }*/
    //     }
    //     e.preventDefault();
    //     e.stopPropagation();
    // })
    // $("body").on('click','.add-more-right',function(e){
    //     $(".add-more").remove();
    //     var left_start = $(".trans-before img").length+1;
    //     var left_end = left_start + 4;
    //     var right_start = $(".trans-after img").length+1;
    //     var right_end = right_start + 4;
    //     // $(this).remove();
    //     if (left_start <= left_count && left_start >1) {
    //         $("#container1").append('<div class="img-box before-load"></div>');
    //         $("#container2").append('<div class="img-box before-load"></div>');
    //         showLeftImg(left_start,left_end);
    //         if ((left_start-1) % 2 == 1) {
    //             var before_load = left_start + 10;
    //             setTimeout(function(){
    //                 beforeLoad(ossKey,0,before_load);
    //             },1000)
    //         }
    //     }
    //     if (right_start <= right_count && right_start >1) {
    //         showRightImg(right_start,right_end);
    //         if (right_start % 2 == 1) {
    //             var before_load = right_start + 10;
    //             setTimeout(function(){
    //                 beforeLoad(tOssKey,1,before_load);
    //             },1000)
    //         }
    //     }
    //     e.preventDefault();
    //     e.stopPropagation();
    // })

    /* 输入数值后执行相应行为跳转 */
    // $("#rightPage").blur(function(){
    //     var which_page = $(this).val();
    //     if (which_page) {
    //         goPage(which_page,'right');
    //     }
    // })
    // $("#rightPage").keydown(function(e){
    //     if (e.keyCode == 13){
    //         var which_page = $(this).val();
    //         if (which_page) {
    //             goPage(which_page,'right');
    //         }
    //     }   
    // })
    /*$("#rightPage").blur(function(){
        var which_page = $(this).val();
        location.hash = 'leftTo'+which_page+'';
        location.hash = 'rightTo'+which_page+'';
    })*/

    /* 跳转到对应页面函数 */
    // function goPage(num,which){
    //     if (num) {
    //         l.scrollTop = (img_box_height)*(num-1)+2;
    //         r.scrollTop = (img_box_height)*(num-1)+2;
    //     }
    // }

    /*$(".read-box").on('click','.img-box img',function(){
        var which = $(this);
        openPic(which);
    })*/
    /* 放大图片查看 */
    /*function openPic(which){
        $(".shadow").empty();
        $(".shadow").append($(which).clone()).show();
    }
    $(".shadow").click(function(){
        $(this).hide();
    })*/

})();