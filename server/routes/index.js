var express = require('express');
var router = express.Router();

router.post('/sendFeedback', function(req, res, next) {
  console.log("In feedback");
  console.log(req.body);
  
  var db = req.db;

  var feedbackCollection = db.get("feedbacks");
  
  feedbackCollection.find({email:req.body.email}, {}, function(err, alarms){
      console.log('creating feedback');
      feedbackCollection.insert({
        firstName: req.body.firstname, 
        lastName: req.body.lastname, 
        telNum: req.body.telnum,
        email: req.body.email,
        agree: req.body.agree,
        message: req.body.message
      })
  })
  res.status(200).send('Feedback Recieved,Our Representative will shortly Contact you.');
});


module.exports = router;