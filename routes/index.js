var express = require('express');
//调用router方法生成一个路由实例
var router = express.Router();
var models = require("../models");
var articles = models.Articles;
//引入markDown
let markdown = require('markdown');

/* GET home page. */
//只需要写路径的后半部分
router.get('/', function(req, res, next) {
  //渲染模板，后面是要传进模板的对象。
    var data={
        title:'首页',
        loginner: '薛煜帅',
        age: '24',
        version:new Date(),
        active1:"active",
        active2:"",
        active3:"",
        active4:"",
        active5:"",
    };
    //mongodb 关联查询。
    //先查找，然后将user字符串转换成user对象
    articles.find({}).populate('user').exec(function (error,doc) {
        //查找出来的集合是一个数组集合
        doc.forEach(function (article) {
            //将输入的内容转换成markdown的格式
           article.content = markdown.parse(article.content);
        });
        data.articles=doc;
        console.log(doc);
        res.render('index', data);
    });
    //ejs模板渲染的数据其实是将res.locals对象上的属性 和 res.render('',data)里的data对象合并。可看源码

});

module.exports = router;
