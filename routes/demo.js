var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Demo root page');
});

router.get('/grid', function(req, res) {
  res.render('demo/grid.html');
});


module.exports = router;