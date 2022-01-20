var Session = require('../utils/session')
var Driver = require('../utils/driver')
var passport = require('passport')
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local',(e,u) => {
    res.send({e,u})
  })(req, res, next)
})

module.exports = router
