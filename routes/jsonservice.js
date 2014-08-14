var express = require('express');
var router = express.Router();

var offerList = {
  "data": [
    {
      "OfferId": 159,
      "Name": "1",
      "Description": "jg",
      "OfferPrice": ""
    },
    {
      "OfferId": 158,
      "Name": "fdsfasa2",
      "Description": "fdsaf",
      "OfferPrice": ""
    },
    {
      "OfferId": 153,
      "Name": "test_17961",
      "Description": "test description",
      "OfferPrice": ""
    },
    {
      "OfferId": 152,
      "Name": "test_modifiedDate_5",
      "Description": "tesafdasdfasdfasdfasdf",
      "OfferPrice": "20.00"
    },
    {
      "OfferId": 151,
      "Name": "test_modifieddate_3",
      "Description": "",
      "OfferPrice": ""
    },
    {
      "OfferId": 150,
      "Name": "test_modifeddate_1",
      "Description": "",
      "OfferPrice": ""
    },
    {
      "OfferId": 149,
      "Name": "test_offer_lastmodified",
      "Description": "test",
      "OfferPrice": ""
    },
    {
      "OfferId": 148,
      "Name": "retest1857",
      "Description": "retest1857",
      "OfferPrice": ""
    },
    {
      "OfferId": 147,
      "Name": "test1857",
      "Description": "just try",
      "OfferPrice": ""
    },
    {
      "OfferId": 146,
      "Name": "test-abcdefg",
      "Description": "testadfasfasdf",
      "OfferPrice": ""
    }
  ],
  "total": 78
};
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('jsonservice root page');
});

router.post('/offer-list', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(offerList));
});


module.exports = router;