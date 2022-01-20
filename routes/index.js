var Session = require('../utils/session')
var Driver = require('../utils/driver')
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();


/* GET home page. */
router.get('/',async(req,res) => {
  var create = session.create(
    session.driver
  )
  var all  = await create.run(
    "match(n) return n"
  )
  res.send(all)
});

module.exports = router;
