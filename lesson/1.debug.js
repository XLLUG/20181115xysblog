/**
 * 引入日志记录器
 * @type {*|createDebug.debug|createDebug}
 */
var debug = require('debug');

/*
* 设置日志级别，日志级别的名字为“20181115blog:error”
* */
var error_debug = debug('20181115blog:error');
error_debug('this error');

var warn_debug = debug('20181115blog:warn');
warn_debug("this warn");

var info_debug = debug('20181115blog:info');
info_debug("this is info");

/*
* 通过设置 环境变量中的DEBUG来设置要显示的日志级别
* */