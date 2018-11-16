var express = require('express');
//调用router方法生成一个路由实例
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //渲染模板，后面是要传进模板的对象。
    var data={
      title:'NodeExpress',
        loginner:'薛煜帅',
        age:'24'
    };

  res.render('index', data);
});

module.exports = router;
