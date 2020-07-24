const express = require('express');
const appp= express();

appp.use((req, res, next)=> {
  res.status(200).json({
    message: 'IT Works!'
  });
});

const loginroutes = require('./login');

app.use(function(req,res,next){
  req.db = db;
  next();
});


appp.use('./login',loginroutes);

module.exports =appp;

module.exports = appp;