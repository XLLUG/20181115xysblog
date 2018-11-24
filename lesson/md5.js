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
var md5 = crypto.createHash('md5');
var result = md5.update('1').digest('hex');
console.log(result);