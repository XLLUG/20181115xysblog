var express = require('express');
//调用router方法生成一个路由实例
var router = express.Router();
//权限控制
var acount = require("../compent/accountControl");
var models = require("../models");
var articles = models.Articles;

let path = require('path');
//上传文件
var multer = require('multer');
//磁盘存储引擎
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/my-uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now()+'.'+file.originalname.slice(file.originalname.indexOf('.')+1))
    }
});
var upload = multer({ storage: storage });

/* GET home page. */
//只需要写路径的后半部分
router.get('/add', acount.checkLogin,function(req, res, next) {
  //渲染模板，后面是要传进模板的对象。
    var data={
        title:'写博客',
        loginner: '薛煜帅',
        age: '24',
        active1:"",
        active2:"active",
        active3:"",
        active4:"",
        active5:"",
    };

  res.render('articles/article', data);
});
//存储博客内容
router.post('/add',acount.checkLogin, upload.single('image'),function (req, res, next) {
    var reqBody = req.body;
    reqBody.user = req.session.user._id;
    console.log(req.file);
    reqBody.image = path.join("/my-uploads",req.file.filename);
    articles.create(reqBody,function (error,doc) {
        if(error){
            req.flash("error","发表失败");
        }else {
            req.flash("success","发表成功");
            res.redirect("/")
        }
    })
});

module.exports = router;
