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
        req.flash('error','两次输入的密码不一致');
        res.redirect("back")
    } else {
        User.create(req.body, function (error, doc) {
            req.flash('success','注册成功');
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
            req.flash('error','请输入正确的用户名和密码');
            res.redirect('back')
        } else {
            if (doc) {
                req.flash('success','登陆成功');
                req.session.user = doc;
                res.redirect('/')
            } else {
                req.flash('error','请输入正确的用户名和密码');
                res.redirect('back')
            }
        }
    })
});
router.get('/logout', function (req, res, next) {
    data.title = '退出';
    /*
    * 这里session值一变，数据库中的值跟着就自动更新
    * */
    req.flash('success','退出成功');
    req.session.user =  null;
    res.redirect('/');
});

module.exports = router;
