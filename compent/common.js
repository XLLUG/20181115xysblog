/*
*
*@author xueyushuai
*/
module.exports = function () {
  return function (req,res,next) {
      //ejs模板渲染的数据其实是将res.locals对象上的属性 和 res.render('',data)里的data对象合并。公共属性放到res.locals中
      res.locals.user = req.session.user;
      res.locals.success =req.flash("success").toString();
      res.locals.error = req.flash("error").toString();
      res.locals.keywords = req.session.keywords;
      next()
  }

};