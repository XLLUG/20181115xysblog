var express = require('express');
//调用router方法生成一个路由实例
var router = express.Router();

/* GET home page. */
//只需要写路径的后半部分
router.get('/', function(req, res, next) {
  //渲染模板，后面是要传进模板的对象。
    var data={
        title:'首页',
        loginner: '薛煜帅',
        age: '24',
        version:new Date()
    };
    //ejs模板渲染的数据其实是将res.locals对象上的属性 和 res.render('',data)里的data对象合并。可看源码
  res.render('index', data);
});

module.exports = router;
