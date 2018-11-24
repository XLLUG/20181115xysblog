/*
*
*@author xueyushuai
*/
//加密
let util = require("../util");
module.exports = password;
function password () {
    return function (req, res, next) {
        if (req.body.password) {
            req.body.password = util.MD5(req.body.password);
        }
        ;
        if (req.body.repassword) {
            req.body.repassword = util.MD5(req.body.repassword);
        }
        next();
    }
}