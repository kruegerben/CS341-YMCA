var express = require('express');
const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname);
var port = 8080;
var app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./CS341-YMCA.db');

app.get('/', function(req, res) {
    console.log('Connection made')
  });

app.listen(port, function() {
    console.log('Listening on port %d', port);
})