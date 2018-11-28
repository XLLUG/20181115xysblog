var express = require('express');
var router = express.Router();
var models = require("../models");
var User = models.User;
var acount = require("../compent/accountControl");
//加密
var  MD5 = require('../util').MD5;
var data = {
    loginner: '薛煜帅',
    age: '24',
    version: new Date(),
    active1:"",
    active2:"",
    active3:"",
    active4:"",
    active5:"",
};

/* GET users listing. */
//只需要写路径的后半部分

/**
 *注册
 * 将权限控制加到中间
 */
router.get('/reg',acount.checkNoLogin,function (req, res, next) {
    data.title = '注册';
    data.active5='';
    data.active4='active';
    res.render('users/reg', data);
});
/**
 * 将权限控制加到中间
 */
router.post('/reg',acount.checkNoLogin,function (req, res,next) {
    //保存头像https://www.gravatar.com/avatar/+MD5加密后的邮箱
    req.body.avatar = `https://www.gravatar.com/avatar/${MD5(req.body.email)}`;

    //保存对象 两种方法 1、model 的create ，entity的save方法
    if (req.body.repassword != req.body.password) {
        req.flash('error','两次输入的密码不一致');
        res.redirect("back")
    } else {
        User.create(req.body, function (error, doc) {
            req.flash('success','注册成功');
            res.redirect('/users/login');//302  临时重定向
        })
    }

});
/**
 * 登陆
 * 将权限控制加到中间
 */
router.get('/login', acount.checkNoLogin,function (req, res, next) {
    data.title = '登陆';
    data.active5='active';
    data.active4='';
    res.render('users/login', data);
});
router.post('/login',acount.checkNoLogin, function (req, res, next) {
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
router.get('/logout',acount.checkLogin, function (req, res, next) {
    data.title = '退出';
    /*
    * 这里session值一变，数据库中的值跟着就自动更新
    * */
    req.flash('success','退出成功');
    req.session.user =  null;
    res.redirect('/');
});

module.exports = router;
