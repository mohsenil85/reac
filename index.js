var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false 
}));

var comments = 
    [
        {
          "author": "Bob Frankelstien",
          "text": "I am *pretty* cool"
        },
        {
          "author": "Foof Beaninstien",
          "text": "I am `rather droll`"
        },
        {
          "author": "Frank Bobelstien",
          "text": "I am extraordinarily **awesome**"
        }
    ];


var router = express.Router();

router.route('/comments')
    .post(function(req, res){
        comments.push(req.body);
        res.status(201);
        res.send({"message": "user created"});
    })
    .get(function(req, res){
        res.send(comments);
    });

app.use('/api', router);



app.use('/', express.static(__dirname + '/target'));

app.listen(port);
