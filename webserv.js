var express = require('express');
const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname);
var port = 8080;
var app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const { Console } = require('console');
const crypto = require('crypto');
const router = express.Router();
var Member = new Boolean(false);
var Staff = new Boolean(false);
var GenView = new Boolean(false);
var vProgram = "";
hash = crypto.getHashes();
var auth = new Array();
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

app.get("/aauth", function(req, res){
    userid = 0;
        for (let i = 0; i < auth.length; i++) {
            if (auth[i][0] == req.connection.remoteAddress) {
                userid = auth[i][1];
            }
        }
        if (userid != 0) {
            var accountq = "SELECT * FROM Member_Accounts WHERE AccountID = '" + userid + "';";
            db.serialize(function() {
                db.all(accountq, function(err,rows){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        res.send(rows);
                    }
                });
            });  
        }
        else {
            res.send();
        }
});

app.get("/regcheck", function(req, res){
    var userid = 0;
    if (auth.length > 0) {
        for (let i = 0; i < auth.length; i++) {
            if (auth[i][0] == req.connection.remoteAddress) {
                userid = auth[i][1];
            }
        }
        var regq = "SELECT * FROM Member_Accounts JOIN Registration ON Member_Accounts.AccountID = Registration.MemberID JOIN Program ON Registration.ProgramID = Program.ProgramID WHERE Member_Accounts.AccountID = " + userid + ";";
        db.serialize(function() {
            db.all(regq, function(err,rows){
                if(err)
                {
                    console.log(err);
                }
                else{
                    res.send(rows);
                }
            });
        });
    } else {
        var regq = "SELECT * FROM Member_Accounts JOIN Registration ON Member_Accounts.AccountID = Registration.MemberID JOIN Program ON Registration.ProgramID = Program.ProgramID WHERE Member_Accounts.AccountID = " + userid + ";";
        db.serialize(function() {
            db.all(regq, function(err,rows){
                if(err)
                {
                    console.log(err);
                }
                else{
                    res.send(rows);
                }
            });
        });
    }
});

app.get("/regover", function(req, res){
    var regq = "SELECT * FROM Member_Accounts JOIN Registration ON Member_Accounts.AccountID = Registration.MemberID JOIN Program ON Registration.ProgramID = Program.ProgramID;";
    db.serialize(function() {
        db.all(regq, function(err,rows){
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

app.get("/pReg", function(req, res) {
    res.sendFile(__dirname + "/registration_view.html");
});


app.post('/pReg', function(req, res) {
    commit = Boolean(true);
    var userid = 0;
    if (auth.length > 0) {
        for (let i = 0; i < auth.length; i++) {
            if (auth[i][0] == req.connection.remoteAddress) {
                userid = auth[i][1];
            }
        }
        var reg = "INSERT INTO [Registration] (MemberID, ProgramID) VALUES (" + userid + ", " + req.body.pId + ");";
        db.serialize(function() {
            db.all(reg, function(err,rows){
                if(err)                    {
                    console.log(err);
                }
            });
        });
        var up = "UPDATE [Program] SET Capacity = Capacity - 1 WHERE ProgramID = " + req.body.pId + ";"
        db.serialize(function() {
            db.all(up, function(err,rows){
                if(err)
                {
                    console.log(err);
                }
                else{
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
                }
            });
        });
    }
});

app.post('/pCan', function(req, res) {
    var pCan = "DELETE FROM Program WHERE ProgramID = " + req.body.pId + ";";
    db.serialize(function() {
        db.all(pCan, function(err,rows){
            if(err)                    {
                console.log(err);
            }
        });
    });
    var rCan = "DELETE FROM Registration WHERE ProgramID = " + req.body.pId + ";";
    db.serialize(function() {
        db.all(rCan, function(err,rows){
            if(err)                    {
                console.log(err);
            }
        });
    });
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
    var Sun = req.body.Sunday;
    if (Sun != '1') {
        Sun = '0';
    }
    var Mon = req.body.Monday;
    if (Mon != '1') {
        Mon = '0';
    }
    var Tue = req.body.Tuesday;
    if (Tue != '1') {
        Tue = '0';
    }
    var Wed = req.body.Wednesday;
    if (Wed != '1') {
        Wed = '0';
    }
    var Thur = req.body.Thursday;
    if (Thur != '1') {
        Thur = '0';
    }
    var Fri = req.body.Friday;
    if (Fri != '1') {
        Fri = '0';
    }
    var Sat = req.body.Saturday;
    if (Sat != '1') {
        Sat = '0';
    }
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
    
    var insertq = 'INSERT INTO [Program] ( Name, MemberCost, NonCost, Capacity, Date, Time, Location, Sun, Mon, Tue, Wed, Thur, Fri, Sat, Description) VALUES ( "' + progName + '", ' + mPrice + ', '+ nPrice +', '+ progCap +', "'+ dateRange +'", "'+ timeRange +'", "'+ progLoc +'", "'+ Sun +'", "'+ Mon +'", "'+ Tue +'", "'+ Wed +'", "'+ Thur +'", "'+ Fri +'", "'+ Sat +'", "'+ progDesc +'");';
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

app.get('/register', function(req, res) {
    res.sendFile(__dirname + "/registration_page.html");
});

app.get('/_home', function(req, res) {
    for (let i = 0; i < auth.length; i++) {
        if (auth[i][0] == req.connection.remoteAddress) {
            auth.splice(i, 1);
        }
    }
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
    for (let i = 0; i < auth.length; i++) {
        if (auth[i][0] == req.connection.remoteAddress) {
            userid = auth[i][1];
        }
    }
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

app.get('/acc', function(req, res) {
    res.send({"Member": Member + "", "Staff": Staff + ""});
})

app.post('/auth', function(req, res) {
    var name = req.body.uname;
    var password = crypto.createHash('sha256').update(req.body.psw).digest('hex');
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
                            useri = [req.connection.remoteAddress, user[0][col[2]]];
                            auth.push(useri);
                            if (Staff == Boolean(true)) {
                                res.sendFile(__dirname + "/HomePage(Staff).html");
                            } else if (Member == Boolean(true)) {
                                res.sendFile(__dirname + "/HomePage(Logged in).html");
                            } else {
                                res.sendFile(__dirname + "/HomePage(General).html")
                            }
                        }
                    }
                  }
                  res.sendFile(__dirname + "/login.html");
            }
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