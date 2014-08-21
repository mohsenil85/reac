var express = require('express');
var logger = require('morgan');

var app = express();
var port = 8000;

app.use(logger('dev'));

app.get('/', function(req, res){
  res.send(200);
});

app.listen(port);
