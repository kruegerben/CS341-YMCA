var express = require('express');
const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname);
var port = 8080;
var app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = new sqlite3.Database('./CS341-YMCA.db');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get('/:data', function(req, res) {
    res.sendFile(__dirname + "/" + req.params.data);
});

app.post('/auth', function(req, res) {
    var user_name = req.body.uname;
    var password = req.body.psw;
    console.log("User name = "+user_name+", password is "+password);
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.listen(port, function() {
    console.log('Listening on port %d', port);
})