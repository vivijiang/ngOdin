var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Demo root page');
});

router.get('/grid', function(req, res) {
  res.render('demo/grid.html');
});

router.get('/validation', function(req, res) {
    res.render('demo/validation');
});

module.exports = router;