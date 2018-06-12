      /*1.创建XMLHTTPRequest对象*/
var xhr;
//      兼容处理
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
}else{
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
function myAjax(method,url,params,callback){
          /*2.注册回调函数 - 事件处理程序
      * 事件: readystatechange
      * 事件处理程序 : 绑定的函数*/
    xhr.onreadystatechange=function(){
        //        监听的是xhr.readyState的变化 //执行了4次
//        0-未初始化 1-读取中 2-已读取 3-交互中 4-完成
        if(xhr.readyState==4&&xhr.status==200){
            callback()
        }
    }
    if(method=="get"){
              /*3.XHR跟服务器发起连接
      * 1.请求方法 HTTP
      * 2.请求地址
      * get请求数据: url?name=值*/
        xhr.open(method,url+"?"+params);
        //   4.发送参数
//   get请求: 参数send(null)
        xhr.send(null)
    }else if(method=="post"){
        xhr.open(method,url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(params)
    }
}
