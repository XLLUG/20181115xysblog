/*
*
*@author xueyushuai
*/
var crypto =require("crypto");
/**
 * 1、不同的输入得到不同的结果
 * 2、相同的输入得到相同的结果
 * 3、根据结果逆推不出输入
 */
exports.MD5=function (input) {
  return  crypto.createHash('md5').update(input).digest('hex');
};