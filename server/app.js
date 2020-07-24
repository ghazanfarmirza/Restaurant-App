var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var User = require('./models/user');

require('dotenv').config();


const mongoose = require('mongoose');
var passport = require('passport');

var db = require('monk')('mongodb://Awab:007421a@ds149682.mlab.com:49682/smart_mirror');
const options = {
  useNewUrlParser: true
};
mongoose.connect('mongodb://Awab:007421a@ds149682.mlab.com:49682/smart_mirror', options);

app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());


app.use(cors());

app.use(expressValidator({
  customValidators: {
    usernameExistsAsync: async function (value) {
      var user = await Users.find({ username: value })
      return user.length == 0;
    },
    usernameExistsPromise: function (value) {
      Users.find({ username: value })
        .then(function (result) {
          return result.length == 0
        })
        .catch(function (err) { console.log(err) })
    }
  }
})
)

app.use(function(req,res, next){
	req.io = io;
	next();
});


app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use(expressValidator({
  customValidators: {
    gte: function (param, num) {
      return param >= num;
    }
  }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.set('port', (process.env.PORT || 4000));

http.listen(app.get('port'), function(){
	console.log('listening on port');
});