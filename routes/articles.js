var express = require('express');
//调用router方法生成一个路由实例
var router = express.Router();
//权限控制
var acount = require("../compent/accountControl");
var models = require("../models");
var articles = models.Articles;
//上传文件

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
router.post('/add',acount.checkLogin,function (req, res, next) {
    var reqBody = req.body;
    reqBody.user = req.session.user._id;
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
