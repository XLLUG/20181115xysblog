/*
*
*@author xueyushuai
*/
var mongoose = require("mongoose");
var dbconfig = require("../config").DBConfig;
var db = mongoose.connect(dbconfig.url,dbconfig.options);
db.then(function () {
    console.log("数据库连接成功")
}).catch(function () {
    console.log("数据库连接失败")
});
var User = mongoose.model("users",new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));
exports.User = User;
