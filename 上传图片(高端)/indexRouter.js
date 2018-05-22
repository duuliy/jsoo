/*GET POST PUT DELETE*/
//Express的路由
const express = require("express");
const path = require("path");
const fs = require("fs");

/*=====异步上传图片=======*/
const multipart = require("connect-multiparty");


const userController =  require("../controller/userController")
const studentController =  require("../controller/studentController")
const deptController = require("../controller/deptController")
const uploadController = require("../controller/uploadController")
const upload = require("../config/uploadconfig")
const smsController = require("../controller/smsController")

//获取路由对象
const router = express.Router()

/*=========请求处理==========*/

router.route("/login.do")
  .get(userController.getUser)
  .post(userController.postUser)

router.post("/reg.do",userController.addUser2)
router.post("/reg.do",userController.addUser2)

router.get("/addStudent.do",studentController.addStudent)

router.get("/checkuser.do",userController.checkUser)
router.post("/checkuser.do",userController.checkUser)

router.get("/getAllUser.do",userController.getAllUser)

router.get("/searchUser.do",userController.getAllUser)


router.get("/getUser.do",userController.getUserById)

router.get("/getStudent.do",studentController.getStudent)


//分页

router.get("/getPageTotal.do",studentController.getPageTotal)
/*router.get("/day3.html",(req,resp)=>{
  // resp.sendFile("F:/140Acode/Node/Day3/public/day3.html")
  //sendFile(1.文件夹路径， 2.文件名)
  //path - 路径合并操作 routes/../public

  //进行判断
  resp.sendFile(path.join(__dirname, '../public', 'success.html'));
  // res.sendFile('../public/index.html', {root: __dirname});
})*/


/*====day6*/
router.post("/regUser.do",userController.addUser3) //DAO
router.post("/regUser2.do",userController.addUser4);//Promise



router.get("/getDept.do",deptController.getDept)


/*=====EJS=======*/
// router.get("/studentlist",studentController.getAllStudent)
router.get("/studentlist",(req,resp)=>{
  resp.redirect("/studentlist/1")
});
/*动态路由拦截 :page*/
router.get("/studentlist/:page",studentController.getAllStudent)
router.get("/detail",studentController.getDetail)
/*=========day8 session cookie=========*/
router.post("/newlogin.do",userController.newLogin);
router.get("/getUsername.do",userController.getUsername)
router.get("/vip.html",(req,resp,next)=>{
  console.log("拦截了");
  // resp.send("被拦截下来了");

  console.log(req.session.username);
  if(req.session.username!=undefined){
    //username有值,代表登录
    // resp.sendFile(path.join(__dirname,"../public/vip.html"))
    next();
    // resp.redirect("vip.html"); //导致重定向过多，死循环
  }else{
    resp.redirect("login.html")
  }
})


/*上传文件的流程
* 1.使用multer来去读取form multipart(文件)
* multer:
* 配置: 1.destination文件存放的位置 2.filename 文件上传后的名字，默认是随机，不带后缀名
* 配置完毕把配置的内容写到multer({storage属性})，返回上传上传对象，导出upload
* 2.在路由:
* 拦截上传的post请求，然后通过upload对象调用single方法("表单file的name值")
* 单个文件: req.file*/
router.post("/uploadFile.do",upload.single("myfile"),uploadController.uploadFile)
//多个文件array方法
//upload.array("name值");
//访问多个文件 req.files ->数组，每个文件单独对象

router.get("/getImage.do",uploadController.getImage)


/*=========day10 短信=========*/
router.post("/sendCode.do",smsController.sendCode);
router.post("/verifyCode.do",smsController.verifyCode);
router.post("/sendMail.do",smsController.sendMail)
module.exports=router


/*=========异步上传图片======*/
// router.post("/uploadImageAsync.do",multipart({uploadDir:"./public/uploads"}),uploadController.uploadImageAsync);
router.post("/uploadImageAsync.do",upload.single("imgfile"),uploadController.uploadImageAsync);



/*========CANVAS 转图片=========*/
router.post("/uploadCanvas.do",(req,resp)=>{
  console.log(req.body.imagedata)
  var base64data = req.body.imagedata;
  //replace代替，
  base64data = base64data.replace(/data:image\/png;base64,/,"");
  console.log(base64data)
    //buffer 把文件存入缓冲区，base64是转化类型是图片，是node.js中内置的方法
  var databuffer = new Buffer(base64data,"base64");
  //很多时候用日期来给图片文件命名。
  var filename = new Date().getTime()+"_cat.jpg"
    //fs写入文件到public
  fs.writeFile("public/canvas/"+filename,databuffer,function(err){
    if(err){
      resp.send(err);
    }else{
      resp.send("保存成功");
    }
  })
})