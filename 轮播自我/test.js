/**
 * 轮播图组件
 * @param opts        参数列表： 图片参数   图片跳转路径   轮播图延时
 * @param targetId    目标盒子ID        必需
 * @constructor
 */
//封装要实现每个函数功能的单一性
//传递一个参数w，减少跨作用域查找
(function (w) {
    //不变的内容放在构造函数外面
    //模板字符串
    var template = '<div class="w-slider" id="js_slider">' +
        '<div class="slider">' +
        '<div class="slider-main" id="slider_main_block">' +
        '</div>' +
        '</div>' +
        '<div class="slider-ctrl" id="slider_ctrl">' +
        '<span class="slider-ctrl-prev"><</span>' +
        '<span class="slider-ctrl-next">></span>' +
        '</div>' +
        '</div>';
    var imgStr = "<div class='slider-main-img'><a href='{{href}}'><img src='{{src}}'/></a></div>";
 
    //默认参数
    var defaultOpts = {
        time: 2000
    };
 
    /**
     * 添加事件
     * @param target    给谁添加
     * @param type      添加的事件类型
     * @param handler   事件处理函数
     */
    var addEvents =  (function () {
        //能力检测
        if (window.addEventListener) {
            return function(target, type, handler) {
                target.addEventListener(type,handler,false);
            };
        } else if (window.attachEvent) {
            return function(target, type, handler) {
                target.attachEvent("on" + type, handler);
            };
        }
    })();
 
    /**
     * 获取样式的属性值
     * @param obj
     * @param attr
     * @returns {*}     返回值带有单位
     */
    var getStyle =  function (obj, attr) {
        if (obj && obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    };
 
    function Carousel(targetId, opts) {
 
        if (!targetId) throw new Error("请传入目标盒子");
 
 
        this.targetId = document.getElementById(targetId);
        this.str = template;
        this.targetId.innerHTML = this.str;
        this.bigBox = document.getElementById("js_slider");
        this.parentBox = document.getElementById("slider_main_block");
        this.ctrlBox = document.getElementById("slider_ctrl");
 
        opts = opts || defaultOpts;
 
        //混入继承  判断传入的opts是否有默认参数中的值，如果默认参数值不存在opts中
        //         就把默认参数加进opts中,这样就不会把默认参数修改了
        for (var k in defaultOpts) {
            if(!opts[k]) {
                opts[k] = defaultOpts[k];
            }
        }
 
        for (var k in opts) {
            this[k] = opts[k];
        }
 
        this.timer = null;              //总定时器
        this.iNow = 0;                  //控制播放张数，是哪个图片动
        this.init();
    }
 
    Carousel.prototype = {
        constructor: Carousel,
        //初始化页面，事件绑定
        init: function () {
            this._createNode();
            this._addEvents();
            this.timer = setInterval(this._autoPlay(), this.time);
        },
 
        //节点生成,页面布局
        _createNode: function () {
            var _this = this;
            var newimgStr = "";
            for (var i = 0; i < this.imgData.length; i++) {
                //生成轮播图节点
                newimgStr += imgStr.replace("{{href}}",this.imgData[i].href).replace("{{src}}",this.imgData[i].src);
                this.parentBox.innerHTML = newimgStr;
                this.imgs = this.parentBox.children;       //轮播图图片
                var img = this.imgs[0].getElementsByTagName("img")[0];
                //生成控制按钮节点
                var span = document.createElement("span");
                span.setAttribute("class", "slider-ctrl-con");
                span.innerHTML = this.imgData.length - i;       //设置span的文本内容方便后面使用
                this.ctrlBox.insertBefore(span, this.ctrlBox.children[1]);
                img.onload = function () {
 
                    //图片加载完全之后设置大盒子宽高
                    _this.scrollWidth = img.offsetWidth;    //大盒子宽度
                    _this.scrollHeight = img.offsetHeight;  //大盒子高度
                    _this.bigBox.style.width = _this.scrollWidth + "px";
                    _this.ctrlBox.style.width = _this.scrollWidth + "px";
                    _this.bigBox.style.height = _this.scrollHeight + "px";
                    _this.ctrlBox.style.height = _this.scrollHeight + "px";
 
                    //设置行高为图片高度
                    _this.prev = _this._getFirstElement(_this.ctrlBox);
                    _this.next = _this._getLastElement(_this.ctrlBox);
                    _this.prev.style.lineHeight = _this.scrollHeight + 100 + "px";
                    _this.next.style.lineHeight = _this.scrollHeight + 100 + "px";
 
                    //第一张图片在原位置，其余全部移动到盒子右侧
                    for (var j = 1; j < _this.imgs.length; j++) {
                        _this.imgs[j].style.left = _this.scrollWidth + "px";
                    }
                };
            }
 
            //第一个高亮
            this.spans = this.ctrlBox.children;
            this.spans[1].setAttribute("class", "slider-ctrl-con current");
        },
 
        //事件绑定
        _addEvents: function () {
            var _this = this;
            this.over = true;       //节流阀
            //监听单击事件，遍历左右箭头和下方小方块
            for (var k in this.spans) {     //this.spans中的属性中包含0-5数字和一个length属性，要排除length属性
                if(k.length === 1 ) {
                    addEvents(this.spans[k], "click", function () {
                        //点击的是左侧按钮
                        if (this.className === "slider-ctrl-prev") {
                            if (_this.over) {
                                _this.over = false;
                                _this._animateEffect(_this.imgs[_this.iNow], {left: _this.scrollWidth}, function () {
                                    _this.over = true;
                                });  //当前图片右移
                                --_this.iNow < 0 ? _this.iNow = _this.imgs.length - 1 : _this.iNow;
                                _this.imgs[_this.iNow].style.left = -_this.scrollWidth + "px";    //后一张图片迅速移到最左边
                                _this._animateEffect(_this.imgs[_this.iNow], {left: 0}, function () {
                                    _this.over = true;
                                });        //后一张图片接着右移动
                                _this._setSquare();
                            }
                        }
 
                        //6.点击右侧按钮，当前图片左移，后一张图片接着后面左移动
                        else if (this.className === "slider-ctrl-next") {
                            _this._autoPlay()();
                        }
 
                        //7.点击下方span开始
                        else {
                            var that = this.innerHTML - 1;    //先保存点击的span的索引
                            if (that > _this.iNow) {           //当点击的span的位置是在当前span位置的右边时，类似于点击了右侧按钮
                                _this._animateEffect(_this.imgs[_this.iNow], {left: -_this.scrollWidth});     //当前图片左移
                                _this.imgs[that].style.left = _this.scrollWidth + "px";   //图片索引为that的迅速移动到最右侧，再接着左移
                            } else if (that < _this.iNow) {     //当点击的span的位置是在当前span位置的左边时，类似于点击了左侧按钮
                                _this._animateEffect(_this.imgs[_this.iNow], {left: _this.scrollWidth});     //当前图片右移
                                _this.imgs[that].style.left = -_this.scrollWidth + "px";   //图片索引为that的迅速移动到最左侧，再接着右移
                            }
                            _this.iNow = that;        //点击的是当前span
                            _this._animateEffect(_this.imgs[_this.iNow], {left: 0});
                            _this._setSquare();
                        }
                    });
 
                }
            }
 
            //监听鼠标移入移出事件
            addEvents(_this.bigBox, "mouseover", function () {
                clearInterval(_this.timer);
                _this.prev.style.display = "block";
                _this.next.style.display = "block";
            });
            addEvents(_this.bigBox, "mouseout", function () {
                clearInterval(_this.timer);               //要使用定时器先清除
                //把当前this作为参数传递到定时器中的函数中
                _this.timer = setInterval(_this._autoPlay(), _this.time);
                _this.prev.style.display = "none";
                _this.next.style.display = "none";
            });
        },
 
        //同步当前小方块样式
        _setSquare: function () {
            for (var i = 1; i < this.spans.length - 1; i++) {
                this.spans[i].setAttribute("class", "slider-ctrl-con");
            }
            //iNow是从0开始，而spans[0]是左箭头，因此iNow+1
            this.spans[this.iNow + 1].setAttribute("class", "slider-ctrl-con current");
        },
 
        //自动轮播,返回一个匿名函数，传递实例的this到定时器中，默认定时器中this是指向window
        _autoPlay: function () {
            var _this = this;
            return function () {
                if (_this.over) {
                    _this.over = false;
                    _this._animateEffect(_this.imgs[_this.iNow], {left: -_this.scrollWidth}, function () {
                        _this.over = true;
                    });     //当前图片左移
                    ++_this.iNow > _this.imgs.length - 1 ? _this.iNow = 0 : _this.iNow;
                    _this.imgs[_this.iNow].style.left = _this.scrollWidth + "px";         //前一张图片迅速移到最右边
                    _this._animateEffect(_this.imgs[_this.iNow], {left: 0}, function () {
                        _this.over = true;
                    });        //接着往左移
                    _this._setSquare();
                }
            }
        },
 
        /**
         * 获取第一个节点
         * @param element
         * @returns {*}
         */
        _getFirstElement: function (element) {
            if (element.firstElementChild) {
                return element.firstElementChild;
            } else {
                var ele = element.firstChild;
                while (ele && ele.nodeType !== 1) {
                    ele = ele.nextSibling;
                }
                return ele;
            }
        },
 
        /**
         * 获取最后一个节点
         * @param element
         * @returns {*}
         */
        _getLastElement: function (element) {
            if (element.lastElementChild) {
                return element.lastElementChild;
            } else {
                var ele = element.lastChild;
                while (ele && ele.nodeType !== 1) {
                    ele = ele.previousSibling;
                }
                return ele;
            }
        },
 
        /**
         * 动画函数
         * @param obj       运动的对象
         * @param json      改变的属性
         * @param fn        回调函数
         */
        _animateEffect: function (obj, json, fn) {
            var _this = this;
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var flag = true;            //先假设所有属性都已到达目标位置
                for (var k in json) {
                    if (k == "opacity") {        //判断透明度情况
                        var leader = json[k] * 100;       //透明度变化不设置渐变
                        var target = json[k] * 100;       //目标位置
                        if ("opacity" in obj.style) {
                            obj.style[k] = leader / 100;
                        } else {
                            obj.style.filter = "alpha(opacity = " + target + ")";   //兼容IE6
                        }
                    } else if (k == "zIndex") {       //判断层级情况
                        leader = parseInt(getStyle(obj, k)) || 0;   //层级变化也不设置渐变
                        target = json[k];
                        obj.style[k] = target;
                    } else {
                        leader = parseInt(getStyle(obj, k)) || 0;
                        target = json[k];
                        var step = target > leader ? Math.ceil((target - leader) / 10) : Math.floor((target - leader) / 10); //缓动公式
                        leader += step;
                        obj.style[k] = leader + "px";
                    }
                    if (leader != target) {      //只要有一个属性没到达目标位置
                        flag = false;
                    }
                }
                if (flag) {          //当所有属性都到达目标位置时清除定时器
                    clearInterval(obj.timer);
                    if (fn) {        //如果有回调函数执行回调函数
                        fn();
                    }
                }
            }, 15);
        }
    };
 
    //支持AMD模块化
    if(typeof define !== "undefined" && typeof define === "function") {
        define("Carousel",[],function(){
            return Carousel;
        });
    }else {
        w.Carousel = Carousel;
    }
}(window));