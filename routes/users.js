var express = require('express');
var router = express.Router();
var models = require("../models");
var User = models.User;
var data = {
    loginner: '薛煜帅',
    age: '24',
    version: new Date()
};

/* GET users listing. */
//只需要写路径的后半部分

/**
 *注册
 */
router.get('/reg', function (req, res, next) {
    data.title = '注册';
    res.render('users/reg', data);
});
router.post('/reg', function (req, res,next) {
    //保存对象 两种方法 1、model 的create ，entity的save方法
    if (req.body.repassword != req.body.password) {
        res.redirect("back")
    } else {
        User.create(req.body, function (error, doc) {
            console.log(doc);
            res.redirect('/users/login');//302  临时重定向
        })
    }

});
/**
 * 登陆
 */
router.get('/login', function (req, res, next) {
    data.title = '登陆';
    res.render('users/login', data);
});
router.post('/login', function (req, res, next) {
    let userInfo = req.body;
    User.findOne({username: userInfo.username, password: userInfo.password}, function (error, doc) {
        if (error) {
            res.redirect('back')
        } else {
            if (doc) {
                res.redirect('/')
            } else {
                res.redirect('back')
            }
        }
    })
});
router.get('/logout', function (req, res, next) {
    data.title = '退出';
    res.render('index', data);
});

module.exports = router;
