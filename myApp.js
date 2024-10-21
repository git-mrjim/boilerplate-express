let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

absolutePath = __dirname + '/views/index.html';

app.get('/', function (req, res) {
    res.sendFile(absolutePath);
});

app.get('/json', function (req, res) {
    let jsonMessage = process.env.MESSAGE_STYLE === 'uppercase' 
    ? {"message": "Hello json".toUpperCase()} 
    : {"message": "Hello json"};
    res.json(jsonMessage);
});

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({time: req.time});
});

app.get('/:word/echo', function (req, res) {
    res.json({echo: req.params.word});
});

app.get('/name', function (req, res) {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({ name: `${firstName} ${lastName}`});
});

app.post('/name', function (req, res) {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({name: `${firstName} ${lastName}`});
});




























 module.exports = app;
