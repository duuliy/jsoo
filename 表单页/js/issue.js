/**
 * Created by Administrator on 2018/5/10/010.
 */

//切换填写方式
    $(".cont_menu ul li").click(function () {
        $(this).addClass("checked");
        $(this).siblings("li").removeClass("checked");
        var index = $(this).index();
        // console.log($(this));
        // console.log(index);
        switch (index) {
            case 0:
                $(".from_left").show();
                $(".from_right").hide();
                break;
            case 1:
                $(".from_right").show();
                $(".from_left").hide();
                break;
        }
    });

//下拉选项
$("dl dd span").click(function () {
    $(this).parent().find(".select").fadeTo(200, 1);
});

/*上传图片*/
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target) {
    var fileSize = 0;
    var filetypes = [".jpg", ".gif", ".png"];
    var filepath = target.value;
    filepath = filepath.substring(filepath.lastIndexOf("\\") + 1, filepath.length);//substring() 方法用于提取字符串中介于两个指定下标之间的字符。
    //alert(filepath);
    var filemaxsize = 1024 * 1; //1M --------这里是文件的大小
    if (filepath) {
        var isnext = false;
        var fileend = filepath.substring(filepath.indexOf("."));
        if (filetypes && filetypes.length > 0) {
            for (var i = 0; i < filetypes.length; i++) {
                if (filetypes[i] == fileend) {
                    isnext = true;
                    break;
                }
            }
        }
        if (!isnext) {
            alert("不接受此文件类型！");
            target.value = "";
            return false;
        }
    } else {
        return false;
    }
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if (!fileSystem.FileExists(filePath)) {
            alert("附件不存在，请重新输入！");
            return false;
        }
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
        $(".store").val(filepath);
        var htmlImg = '<img src="images/detail/' + filepath + '" class="image" alt="" />';
        $(target).before(htmlImg);
        $(target).val(''); //必须制空
    } else {
        fileSize = target.files[0].size;
        if (filepath != "") {
            $(target).siblings("img").remove();
        }
        $(".store").val(filepath);
        var htmlImg = '<img src="images/detail/' + filepath + '" class="image" alt="" />';
        $(target).before(htmlImg);
        $(target).val(''); //必须制空
    }
    var size = fileSize / 1024;
    if (size > filemaxsize) {
        //alert("附件大小不能大于" + filemaxsize / 1024 + "M！");
        alert("附件大小不能大于1M！");
        target.value = "";
        return false;
    }
    if (size <= 0) {
        //alert("附件大小不能为0M！");
        alert("附件大小不能为0M！");
        target.value = "";
        return false;
    }
}

//切换纳税类型
$(".radio_inp .radio").click(function () {
    $(this).addClass("radio_checked");
    $(this).siblings().removeClass("radio_checked");
});

//验证码发送
$(".btnSendCode").click(function(){
    console.log($(this));
    let _this=$(this);
    var InterValObj;
    var count = 120; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

    function sendMessage() {
        curCount = count;
        //设置button效果，开始计时

        _this.attr("disabled", "true");
        _this.val(curCount + "秒后可重新发送");
        InterValObj = window.setInterval(SetRemainTime, 1000);

        //请求后台发送验证码 TODO

    }

//timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            _this.removeAttr("disabled");//启用按钮
            _this.val("重新发送验证码");
        }
        else {
            curCount--;
            _this.val(curCount + "秒后可重新发送");
        }
    }
    sendMessage()
});


//企业二级联动

var cities=[
    ["产品类","青岛市","济南市","威海市"],
    ["科技类","合肥市","阜阳市","亳州市"],
    ["投资类","郑州市","新乡市","洛阳市"],
    ["其他类","郑州市2","新乡市2","洛阳市2"],
];

$("dl dd").each(function () {
    var i,j,k,city_list;
    $(this).find(".select a").click(function () {
        var atxt = $(this).html();
        $(this).parent().parent().find("span a").html(atxt);
        $(this).parent().hide();
    });
    $(this).mouseleave(function () {
        $(this).find(".select").hide();
    })
    if($(this).attr("class")=="dllo"){
        $(this).find(".select a").click(function () {
            $(".selelt").html("");
            var atxtt = $(this).html();
            for(i=0;cities.length;i++){
                if(cities[i][0]==atxtt){
                    for(j=1;j<cities[i].length;j++){
                        city_list = '<a href="javascript:void(0);"> '+ cities[i][j]+'</a>';
                        $(".selelt").append(city_list);
                    }
                }
            }
        });
    }
});


//验证
function Verifica(fliter,val,rt) {
    if(fliter.test(val)&&val){
        var img='<img src="images/issue/y_icon.png" alt="">'
        $(rt).html(img)
    }else {
        $(rt).html("请输入正确的信息")
    }
}

function Verificaname(val) {
    var fliter= /^[\u4E00-\u9FA5A-Za-z]+$/,
        rt,
        vall=val.value;
    if(val.placeholder=="请输入姓名"){
        rt=".rt1"
    }else if(val.placeholder=="请输入您的企业法人姓名"){
        rt=".rt5"
    }else if(val.placeholder=="请输入联系人姓名"){
        rt=".rt7"
    }
    Verifica(fliter,vall,rt)
}
function Verificaphone(val) {
    var fliter= /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        rt,
        vall=val.value;
    if(val.placeholder=="请输入联系人手机号"){
        rt=".rt2"
    }else if(val.placeholder=="请输入联系人手机号码"){
        rt=".rt8"
    }
    Verifica(fliter,vall,rt)
}

function Verificamoney(val) {
    var fliter=eval(/^[0-9]*$/),
         rt,
         vall=val.value;
    if(val.placeholder=="请输入注册资本"){
        rt=".rt3"
    }else if(val.placeholder=="请输入实缴资本"){
        rt=".rt4"
    }else if(val.placeholder=="请输入出售价格"){
        rt=".rt6"
    }
    Verifica(fliter,vall,rt)
}
