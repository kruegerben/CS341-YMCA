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
    var name = req.body.uname;
    var password = req.body.psw;
    db.serialize(function() {
        const searchq = "SELECT * FROM Member_Accounts WHERE Email = '" + name + "' AND Password = '" + password + "';";
        db.all(searchq, function(err,rows) {
            if (err)
            {
                console.log(err);
            }
            else
            {
                var user = rows;
                var col = [];
                for (var i = 0; i < user.length; i++) {
                  for (var key in user[i]) {
                    if (col.indexOf(key) === -1) {
                      col.push(key);
                    }
                  }
                }
                for (var i = 0; i < user.length; i++) {
                    for (var j = 0; j < col.length; j++) {
                      console.log(user[i][col[j]]);
                    }
                  }
            }
        })
    })
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.listen(port, function() {
    console.log('Listening on port %d', port);
})