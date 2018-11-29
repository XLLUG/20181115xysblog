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
    /**
     * req.query 获取get方法url后面的查询字符串参数
     * @type {RegExp}
     */
    var keywords = req.query.keywords;
    //利用正则来进行匹配，i不区分大小写
    var search = new RegExp(keywords,'i');

    //or查询的查询条件
    var queryObject = {$or:[{title:search},{content:search}]};
    //将查询的关键字放在session中
    req.session.keywords =keywords;



    /*
    * 分页功能
    * */
    //当前页
    var pageNum =parseInt(req.query.pageNum) || 1;
    //每页数目
    var pageSize = parseInt(req.query.pageSize) || 2;
    req.session.pageSize = pageSize;
    req.session.pageNum = pageNum;
    //跳过查询的数目
    var skipNum = parseInt((pageNum-1)*pageSize);
    //mongodb 关联查询。
    //先查找，然后将user字符串转换成user对象
    articles.find(queryObject).skip(skipNum).limit(pageSize).populate('user').exec(function (error,doc) {
        //查找出来的集合是一个数组集合
        console.log(doc);
        doc.forEach(function (article) {
            //将输入的内容转换成markdown的格式
           article.content = markdown.parse(article.content);
        });
        //查询满足条件的总条数
        articles.count(queryObject,function (error,count) {
           data.totalPage = Math.ceil(count/pageSize);
           data.pageNum =pageNum;
           data.pageSize = pageSize;
           data.articles=doc;
           data.keywords = keywords;
           res.render('index', data);
        });
        //console.log(doc);

    });
    //ejs模板渲染的数据其实是将res.locals对象上的属性 和 res.render('',data)里的data对象合并。可看源码

});

module.exports = router;
