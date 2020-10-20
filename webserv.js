var express = require('express');
const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname);
var port = 8080;
var app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./CS341-YMCA.db');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.get('/:data', function(req, res) {
    res.sendFile(__dirname + "/" + req.params.data);
});

app.post('/', function(req, res) {

});

app.listen(port, function() {
    console.log('Listening on port %d', port);
})