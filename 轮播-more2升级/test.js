
    function $$(id){
        return document.querySelector(id)
    }

(function($){

    // console.log(opts.Imglist.length);

    //点点模板的构建
    var btn_quan = document.createElement("div");
    var spanlist="<span class='spanlist '></span>";
    btn_quan.className = 'btn_quan';

    var Duuliy=function (ele,opts){
        
        // console.log(opts)
        if (!ele) throw new Error("请传入目标盒子");
        //构建布局
        var that=this,
            toggle = opts.toggle || "fade";
        this.ele=$$(ele);
        this.i = 0;
        this.s = 0;
        this.imglist=this.ele.children;  //图片
        this.Imglist=$(this.imglist)
        this.span_any=spanlist; 
        this.clickX;
        this.clickY;
        this.widthW=$("#banner")[0].offsetWidth;
        this.heightH=$("#banner")[0].offsetHeight;
        $(".banner_warp")[0].appendChild(btn_quan);
        
        for(var i=1;i<this.imglist.length;i++){
            this.span_any+=spanlist
        }

        btn_quan.innerHTML=this.span_any;
        // btn_quan.style.marginLeft="-"+btn_quan.offsetWidth/2+"px";
        this.changeStyle.call(btn_quan,"marginLeft","-"+btn_quan.offsetWidth/2+"px")

        $(".spanlist:first").addClass("on");
        switch(toggle){
            case "fade":
            this.auto_dio({
                Imglist:that.Imglist,
                i:that.i,
                dian:$(".spanlist"),
                s:that.s,
                num:this.Imglist.length,
                time:opts.time
            });
            break;
            case "horizontal":
            this.dir_LR({
                clickX:this.clickX,
                clickX:this.clickY,
                Imglist:that.Imglist,
                i:that.i,
                dian:$(".spanlist"),
                s:that.s,
                widthW:this.widthW,
                num:this.Imglist.length,
                time:opts.time
            });
            break;
            case "vertical":
            this.dir_UD({
                clickX:this.clickX,
                clickX:this.clickY,
                Imglist:that.Imglist,
                i:that.i,
                dian:$(".spanlist"),
                s:that.s,
                heightH:this.heightH,
                num:this.Imglist.length,
                time:opts.time
            });
            break;
        }
    };

    //为省时间用jq
    Duuliy.prototype={
        //插曲 位置
        changeStyle:function(attr,value){
            this.style[attr] = value;
        },
        //层级模式
        opacity:function(Imglist,i){
            var ii=Imglist.length-1-i
            Imglist.eq(ii).fadeIn(500).siblings().fadeOut(500);
        },
        fun1:function(opts){
            opts.i++
            if (opts.i < opts.Imglist.length) {
                this.opacity(opts.Imglist,opts.i % opts.num)
            } else {
                opts.i = 0
               this.opacity(opts.Imglist,opts.i % opts.num)
            }
        },
        dian:function(dian,s){
            dian.eq(s).addClass("on").siblings().removeClass("on");
        },
        fun2:function(opts){
            opts.s++;
            if (opts.s < opts.Imglist.length) {
                this.dian(opts.dian,opts.s % opts.num);
            } else {
                opts.s = 0
                this.dian(opts.dian,opts.s % opts.num);
            }
        },
        auto_dio:function(opts){
            var that=this,
                time,
                start=true;
                function autoPlay(opts){
                    // time = setInterval(function(){
                    //     that.fun1(opts)
                    //     that.fun2(opts)
                    // }, opts.time);
                    time =setTimeout(function(){
                        if(start){
                            that.fun1(opts)
                            that.fun2(opts)
                            setTimeout(arguments.callee,opts.time)
                        }
                    },opts.time);
                }
                autoPlay(opts)
            //点击层级
            function ondian(opts,_self){
                for (var i = 0; i < opts.Imglist.length; i++) {
                    if (_self == $(".spanlist")[i]) {
                        opts.i=i;
                        opts.s=i;
                        that.opacity(opts.Imglist,i);
                        $(_self).addClass("on").siblings().removeClass("on");
                    }
                }       
            }
            $(document).on("click", ".spanlist", function () {
                var _self=this;
                start=false;
                // clearTimeout(time);
                time=null;
                ondian(opts,_self)
            })
            $(document).on("mouseenter", ".banner_warp", function () {
                // clearTimeout(time);
                start=false;
                time=null;
            })
            $(document).on("mouseleave", ".banner_warp", function () {
                start=true;
                autoPlay(opts)
            })
        },
        //手风琴和上下切换
        Mdown:function(opts){
            $("#banner").on("mousedown", function () {
                var e = window.event || arguments[0];
                opts.clickX = e.clientX;
                opts.clickY = e.clientY;
            });
        },
        dir_lr:function(dian,Imglist,i,lang,y,z){
            var ii=Imglist.length-1-i
            Imglist.eq(ii).animate({width: lang+"px"}, y).siblings().animate({width: "0"}, z);
            this.dian(dian,i);
        },
        dir_LR:function(opts){          
            var that=this;
            this.Mdown(opts)
            $("#banner").on("mouseup", function () {
                var we = window.event || arguments[0],
                    clickXx = we.clientX,
                    clickYy = we.clientY;
                    if (clickXx - opts.clickX > 150) {
                        //右移動
                        // console.log("右边")
                        opts.i++;
                        if (opts.i < opts.num) {
                            that.dir_lr(opts.dian,opts.Imglist,opts.i % opts.num,opts.widthW,"fast","slow")
                        } else {
                            opts.i = 0;
                            that.dir_lr(opts.dian,opts.Imglist,opts.i % opts.num,opts.widthW,"fast","slow")
                        }
                    } else if (opts.clickX - clickXx > 150) {
                        //左移動
                        // console.log("左边");
                        opts.i--;
                        if (opts.i < 0) {
                            opts.i = opts.num - 1;
                            that.dir_lr(opts.dian,opts.Imglist,opts.i % opts.num ,opts.widthW,"slow","fast")
                        } else {
                            that.dir_lr(opts.dian,opts.Imglist,opts.i % opts.num,opts.widthW ,"slow","fast")
                        }
                    }
                });
        },
        dir_ud:function(dian,Imglist,i,lang,y,z){
            var ii=Imglist.length-1-i
            Imglist.eq(ii).animate({height: lang+"px"}, y).siblings().animate({height: "0"}, z);
            this.dian(dian,i);
        },
        dir_UD:function(opts){
            var that=this;
            this.Mdown(opts)
            $("#banner").on("mouseup", function () {
                var we = window.event || arguments[0],
                    clickXx = we.clientX,
                    clickYy = we.clientY;
                if (clickYy - opts.clickY > 150) {
                    //下移動
                    // console.log("下边")
                    opts.i++;
                    if (opts.i < opts.num) {
                        that.dir_ud(opts.dian,opts.Imglist,opts.i % opts.num,opts.heightH,"fast","slow")
                    } else {
                        opts.i = 0;
                        that.dir_ud(opts.dian,opts.Imglist,opts.i % opts.num,opts.heightH,"fast","slow")
                    }
                } else if (opts.clickY - clickYy > 150) {
                    //上移動
                    // console.log("上边");
                    opts.i--;
                    if (opts.i < 0) {
                        opts.i = opts.num - 1;
                        that.dir_ud(opts.dian,opts.Imglist,opts.i % opts.num,opts.heightH,"slow","fast")
                    } else {
                        that.dir_ud(opts.dian,opts.Imglist,opts.i % opts.num,opts.heightH,"slow","fast")
                    }
                }
            })
        }

    }

    Duuliy.init=function(ele,opts){
        // var that =this;
        // ele.each(function(){
            new Duuliy(ele,opts);           //  重用，每次 new
            // new Duuliy("#banner",opts);
        // })
    }


    window['Duuliy'] = Duuliy;
})(jQuery)

