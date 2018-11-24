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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
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
