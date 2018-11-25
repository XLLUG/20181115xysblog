var createError = require('http-errors');
var express = require('express');
//处理路径
var path = require('path');
//处理收藏夹图标
var favicon=require('serve-favicon');
//解析cookie
var cookieParser = require('cookie-parser');
//写日志
var logger = require('morgan');
//主页路由
var indexRouter = require('./routes/index');
//用户路由
var usersRouter = require('./routes/users');
//发表文章路由
var articlesRouter = require('./routes/articles');
//加密密码
var password = require('./compent/pasword');
//会话
let session = require("express-session");
//将会话信息存到数据库中，得到的是mongoDB存储session的一个类
let MongoStore = require("connect-mongo")(session);
//页面通知模块
let flash  = require("connect-flash");
var dbconfig = require("./config").DBConfig;
//公共模块
var common = require('./compent/common');

//得到app一个函数
var app = express();
// view engine setup 设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'ejs');
/*
* 如果改成html  要指定HTML模板的渲染方法
*
* app.engine('html',require('ejs').__express);
* */
//设置图标
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
//日志记录中间件
app.use(logger('dev'));
//处理content-type=json的请求体
app.use(express.json());
//处理content-type=urlencoded的请求体,extended 为true表示用querystring来解析
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件中间件，指定根目录为public
app.use(express.static(path.join(__dirname, 'public')));
//对密码加密
app.use(password());
app.use(session({
    resave:true,
    secret:'xys',
    saveUninitialized:true,
    store:new MongoStore({
        url:dbconfig.url
    })
}));
app.use(flash());
app.use(common());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
//捕获404错误
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//错误处理中间件
/**
 * app.get('env') 获取到的默认为development 开发环境
 * 设置运行环境，只需设置环境变量中的（process.env.NODE_ENV） 即  set NODE_ENV=production
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // ejs模板渲染的数据其实是将res.locals对象上的属性 和 res.render('',data)里的data对象合并。
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  /*
  * 模板里用到的变量必须传进去
  * */
  res.render('error');
});

module.exports = app;
