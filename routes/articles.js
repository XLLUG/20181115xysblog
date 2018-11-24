var express = require('express');
//调用router方法生成一个路由实例
var router = express.Router();

/* GET home page. */
//只需要写路径的后半部分
router.get('/post', function(req, res, next) {
  //渲染模板，后面是要传进模板的对象。
    var data={
        title:'写博客',
        loginner: '薛煜帅',
        age: '24'
    };

  res.render('index', data);
});

module.exports = router;
