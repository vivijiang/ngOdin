var express = require('express');
var router = express.Router();


var offerList =[];
// Retrieve
var MongoClient = require('mongodb').MongoClient;
var ngOdinDB;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/ngodindb", function(err, db) {
    if(err) { return console.dir(err); }
    ngOdinDB =db;
});


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('jsonservice root page');
});

router.post('/offer-list', function(req, res) {
    var reqData = req.body;
    var pageSize = reqData.size;
    var pageIndex = reqData.page-1;
    var orderBy = reqData.orderBy;

    var totalLength =0;
    for (var property in orderBy)
    {
        orderBy[property] === 'asc' ? orderBy[property] = -1: orderBy[property]= 1
    }

    // get all offerlist
    ngOdinDB.collection('offerlist', function(err, collection) {
        // sort by and a value of 1 or -1 to specify an ascending or descending sort respectively.
        collection.find().toArray(function(err, items){
            totalLength= items.length;
        });
        collection.find().sort(orderBy).skip(pageIndex * pageSize).limit(pageSize).toArray(function(err, items) {
            offerList = {data:items, total: totalLength};
        });


        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(offerList));
    });


});


router.post('/coursetype', function(req, res) {
    var reqData = req.body;
    var pageSize = reqData.size;
    var pageIndex = reqData.page-1;
    var orderBy = reqData.orderBy;

    var totalLength =0;
    for (var property in orderBy)
    {
        orderBy[property] === 'asc' ? orderBy[property] = -1: orderBy[property]= 1
    }

    // get all offerlist
    ngOdinDB.collection('offerlist', function(err, collection) {
        // sort by and a value of 1 or -1 to specify an ascending or descending sort respectively.
        collection.find().toArray(function(err, items){
            totalLength= items.length;
        });
        collection.find().sort(orderBy).skip(pageIndex * pageSize).limit(pageSize).toArray(function(err, items) {
            offerList = {data:items, total: totalLength};
        });


        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(offerList));
    });


});

module.exports = router;