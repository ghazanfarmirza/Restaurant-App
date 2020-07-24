var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../models/user');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;



router.post('/login', passport.authenticate('local', { failureRedirect: '/users/fail' }), function (req, res, next) {
	console.log(req.username);
	res.status(200).send(req.user.username+" "+"is logged in.");
});

router.get('/fail', function (req, res, next) {
	console.log(req.username);
	console.log('fail');
	res.status(200).send('invalid username or password');
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false);
			}
			if(User.comparePassword(password, user.password)) {
				console.log('pass matched');
				return done(null, user);
			}
			else{
				return done(null, false);	
			}
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});


module.exports = router;