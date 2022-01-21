var Session = require('../utils/session')
var Driver = require('../utils/driver')
var passport = require('passport')
var driver = Driver(process.env);
var express = require('express');
var session = Session(driver);
var router = express.Router();

router.post('/',(req, res, next) => {
  passport.authenticate('local',(e,u) => {
    res.send({e,u})
  })(req, res, next)
})

router.post('/submit',async(req,res) => {
  var _session = session.create(
   session.driver
  )
  var test = await _session.run(
    `match(user)<-[rl:profile]
    -(p) where user.username=$
    username and user.password
    =$password return user,p`,
    Object( { ...req.body } )
  )
  if(test.records.length > 0){
   test.records.map(___r => {
     var [u] = ___r._fields
     .filter(({labels}) =>
       labels == "user"
     )
     var [p] = ___r._fields
     .filter(({labels}) =>
       labels== "profile"
     )
     res.send({
       user : u.properties,
       profile : p.properties
     })
   })
  }
})

module.exports = router
