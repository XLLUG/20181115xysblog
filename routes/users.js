var express = require('express');
var router = express.Router();

/* GET users listing. */
//只需要写路径的后半部分
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
