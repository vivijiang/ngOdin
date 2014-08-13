var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ngOdin: angularJS for Odin' });
});

module.exports = router;
