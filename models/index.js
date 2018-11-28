/*
*
*@author xueyushuai
*/
var mongoose = require("mongoose");
var dbconfig = require("../config").DBConfig;
var db = mongoose.connect(dbconfig.url,dbconfig.options);
var objectId = mongoose.Schema.Types.ObjectId;
db.then(function () {
    console.log("数据库连接成功")
}).catch(function () {
    console.log("数据库连接失败")
});
var User = mongoose.model("users",new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));
var Articles = mongoose.model('articles',new mongoose.Schema({
     user:{type:objectId,ref:'users'},
     title:String,
     content:String,
     createTime:{type:Date,default:Date.now()},
     image:String
}));
exports.User = User;
exports.Articles=Articles;
