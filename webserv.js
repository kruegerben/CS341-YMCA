var express = require('express');
const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname);
var port = 8080;
var app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const { Console } = require('console');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = new sqlite3.Database('./CS341-YMCA.db');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.get('/programs', function(req, res) {
    res.sendFile(__dirname + "/programs.html");
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get('/proover', function(req, res) {
    var progq = "SELECT * FROM Program";
    db.serialize(function() {
        db.all(progq, function(err,rows){
            if(err)
            {
                console.log(err);
            }
            else{
                res.send(rows);
            }
        });
    });
  });

app.post('/auth', function(req, res) {
    var name = req.body.uname;
    var password = req.body.psw;
    var Name = "";
    var Member = new Boolean(false);
    var Staff = new Boolean(false);
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
                        if (user[i][col[j]] == 1) {
                            if (j == 4) {
                                console.log("Member Sign in");
                                Member = new Boolean(true);
                            }
                            if (j == 5) {
                                console.log("Staff sign in");
                                Staff = new Boolean(true);
                            }
                        }
                        if (j == col.length - 1) {
                            if (Staff == Boolean(true)) {
                                console.log(Staff);
                                res.sendFile(__dirname + "/HomePage(Staff).html");
                            } else if (Member == Boolean(true)) {
                                console.log(Member);
                                res.sendFile(__dirname + "/HomePage(Logged in).html");
                            } else {
                                res.sendFile(__dirname + "/HomePage(General).html")
                            }
                        }
                    }
                  }
            }
        })
    })
});

app.get('/:data', function(req, res) {
    res.sendFile(__dirname + "/" + req.params.data);
});

app.listen(port, function() {
    console.log('Listening on port %d', port);
})