var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/bookAPI');


var Book = require('./models/bookModel.js');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var bookRouter = require('./Routes/bookRoutes.js')(Book);

app.use('/api/books', bookRouter);


app.get('/', function (req, resp) {
    resp.send("welcome to my api");
});

app.listen(port, function () {
    console.log("Running on port " + port);
});