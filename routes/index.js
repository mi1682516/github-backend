var Session = require('../utils/session')
var Driver = require('../utils/driver')
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(session)
});

module.exports = router;
