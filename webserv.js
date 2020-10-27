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
var Member = new Boolean(false);
var Staff = new Boolean(false);
var GenView = new Boolean(false);
var vProgram = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db = new sqlite3.Database('./CS341-YMCA.db');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.get('/home', function(req, res) {
    if (Staff == Boolean(true)) {
        if (GenView == Boolean(true)) {
            res.sendFile(__dirname + "/HomePage(GenView).html");
        } else {
            res.sendFile(__dirname + "/HomePage(Staff).html");
        }
    } else if (Member == Boolean(true)) {
        res.sendFile(__dirname + "/HomePage(Logged in).html");
    } else {
        res.sendFile(__dirname + "/HomePage(General).html")
    }
});

app.post('/home', function(req, res) {
    var sDate = req.body.startd;
    var sDateStr = new Date(sDate.replace(/-/g, '\/'));
    sDateStr = sDateStr.toDateString().replace(/^\S+\s/,'');
    var eDate = req.body.endd;
    var eDateStr = new Date(eDate.replace(/-/g, '\/'));
    eDateStr = eDateStr.toDateString().replace(/^\S+\s/,'');
    var sTime = req.body.startt;
    var sTimeT = sTime.split(':');
    var sHour = Number(sTimeT[0]);
    if (sHour < 0 && sHour <= 12) {
        sTime = "" + sHour;
    } else if (sHour > 12) {
        sTime = "" + (sHour - 12);
    } else if (sHour == 0) {
        sTime = "12";
    }
    var sMin = Number(sTimeT[1]);
    sTime += (sMin < 10) ? ":0" + sMin : ":" + sMin;
    sTime += (sHour >= 12) ? " P.M." : " A.M.";
    var eTime = req.body.endt;
    var eTimeT = eTime.split(':');
    var eHour = Number(eTimeT[0]);
    if (eHour < 0 && eHour <= 12) {
        eTime = "" + eHour;
    } else if (eHour > 12) {
        eTime = "" + (eHour - 12);
    } else if (eHour == 0) {
        eTime = "12";
    }
    var eMin = Number(eTimeT[1]);
    eTime += (eMin < 10) ? ":0" + eMin : ":" + eMin;
    eTime += (eHour >= 12) ? " P.M." : " A.M.";
    var progName = req.body.name;
    var dateRange = sDateStr + " - " + eDateStr;
    var timeRange = sTime + " - " + eTime;
    var progDesc = req.body.description;
    var progLoc = req.body.location;
    var progCap = req.body.pCap;
    var nPrice = req.body.nonmem;
    var mPrice = req.body.mem;
    
    var insertq = 'INSERT INTO [Program] ( Name, MemberCost, NonCost, Capacity, Date, Time, Location, Description) VALUES ( "' + progName + '", ' + mPrice + ', '+ nPrice +', '+ progCap +', "'+ dateRange +'", "'+ timeRange +'", "'+ progLoc +'", "'+ progDesc +'");';
    db.serialize(function() {
        db.all(insertq, function(err,rows){
            if(err)
            {
                console.log(err);
            }
            else{
                res.sendFile(__dirname + "/HomePage(Staff).html");
            }
        });
    });
});

app.get('/_home', function(req, res) {
    Member = new Boolean(false);
    Staff = new Boolean(false);
    GenView = new Boolean(false);
    res.sendFile(__dirname + "/HomePage(General).html");
});

app.get('/programs', function(req, res) {
    res.sendFile(__dirname + "/programs.html");
});

app.get('/programs/:data', function(req, res) {
    res.sendFile(__dirname + "/" + req.params.data);
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

app.get('/prodet', function(req, res) {
    var progq = "SELECT * FROM Program WHERE ProgramID = '" + vProgram + "'";
    db.serialize(function() {
        db.all(progq, function(err,rows){
            if(err)
            {
                console.log(err);
            }
            else{
                res.send(rows)
            }
        });
    });
});

app.post('/auth', function(req, res) {
    var name = req.body.uname;
    var password = req.body.psw;
    var Name = "";
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
                                Member = new Boolean(true);
                            }
                            if (j == 5) {
                                Staff = new Boolean(true);
                            }
                        }
                        if (j == col.length - 1) {
                            if (Staff == Boolean(true)) {
                                res.sendFile(__dirname + "/HomePage(Staff).html");
                            } else if (Member == Boolean(true)) {
                                res.sendFile(__dirname + "/HomePage(Logged in).html");
                            } else {
                                res.sendFile(__dirname + "/HomePage(General).html");
                            }
                        }
                    }
                  }
            }
            res.sendFile(__dirname + "/login.html");
        })
    })
});

app.get('/program_view/standardPage.css', function(req, res) {
    res.sendFile(__dirname + "/standardPage.css");
});

app.get('/program_view/program_view.js', function(req, res) {
    res.sendFile(__dirname + "/program_view.js");
});

app.get('/program_view/:pname', function(req, res) {
    vProgram = req.params.pname;
    res.sendFile(__dirname + "/program_view.html");
});

app.get('/:data', function(req, res) {
    if (req.params.data == "HomePage(GenView).html") {
        GenView = new Boolean(true);
    }
    res.sendFile(__dirname + "/" + req.params.data);
});

app.listen(port, function() {
    console.log('Listening on port %d', port);
})