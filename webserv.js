/**
 * Author: Benjamin Krueger
 * 
 * This is the main backend program for use on the server.
 */
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
var Staff = new Boolean(false);
var GenView = new Boolean(false);
var LoggedIn = new Boolean(false);
var vProgram = "";
var uquery = "";
var pquery = "";
var rquery = "";
var ropt = "Program";
hash = crypto.getHashes();
var auth = new Array();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//This sets the database that we have setup and are using
let db = new sqlite3.Database('./CS341-YMCA.db');

// This responds to the entry request. When the user first arrives at the website.
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/HomePage(General).html");
});

// This sends the users page when staff request it
app.get('/users', function(req, res) {
    res.sendFile(__dirname + "/users.html");
});

// This page responds to any request to fill the users page.
app.get('/accview', function(req, res) {
    var progq = "SELECT * FROM Member_Accounts;";
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

//This responds to the request to arrive at the home page
app.get('/home', function(req, res) {
    if (Staff == Boolean(true)) {
        if (GenView == Boolean(true)) {
            res.sendFile(__dirname + "/HomePage(GenView).html");
        } else {
            res.sendFile(__dirname + "/HomePage(Staff).html");
        }
    } else if (LoggedIn == Boolean(true)) {
        res.sendFile(__dirname + "/HomePage(Logged in).html");
    } else {
        res.sendFile(__dirname + "/HomePage(General).html")
    }
});

// This responds to verify that the user actually has an account
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

// This checks if the user has registered for the program.
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

// This responds to request to view all registrations
app.get("/regover", function(req, res){
    var regq = "SELECT * FROM Member_Accounts JOIN Registration ON Member_Accounts.AccountID = Registration.MemberID JOIN Program ON Registration.ProgramID = Program.ProgramID WHERE Canceled = 0;";
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

// This sends the staff member the registration page.
app.get("/pReg", function(req, res) {
    res.sendFile(__dirname + "/registration_view.html");
});

// This is the request that registers users for their programs.
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
                    } else if (LoggedIn == Boolean(true)) {
                        res.sendFile(__dirname + "/HomePage(Logged in).html");
                    } else {
                        res.sendFile(__dirname + "/HomePage(General).html")
                    }
                }
            });
        });
    }
});

// This is the request the staff sends when they want to cancel a program.
app.post('/pCan', function(req, res) {
    var pCan = "UPDATE [PROGRAM] SET Canceled = 1 WHERE ProgramID = " + req.body.pId + ";";
    db.serialize(function() {
        db.all(pCan, function(err,rows){
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
    } else if (LoggedIn == Boolean(true)) {
        res.sendFile(__dirname + "/HomePage(Logged in).html");
    } else {
        res.sendFile(__dirname + "/HomePage(General).html")
    }
});

// This is request that makes a program in the database using the data the user inputed.
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
    
    var insertq = 'INSERT INTO [Program] ( Name, MemberCost, NonCost, Capacity, Date, Time, Location, Sun, Mon, Tue, Wed, Thur, Fri, Sat, Canceled, Description) VALUES ( "' + progName + '", ' + mPrice + ', '+ nPrice +', '+ progCap +', "'+ dateRange +'", "'+ timeRange +'", "'+ progLoc +'", "'+ Sun +'", "'+ Mon +'", "'+ Tue +'", "'+ Wed +'", "'+ Thur +'", "'+ Fri +'", "'+ Sat +'", 0, "'+ progDesc +'");';
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

// Views the registration page.
app.get('/register', function(req, res) {
    res.sendFile(__dirname + "/registration_page.html");
});

// This is the log out request.
app.get('/_home', function(req, res) {
    for (let i = 0; i < auth.length; i++) {
        if (auth[i][0] == req.connection.remoteAddress) {
            auth.splice(i, 1);
        }
    }
    LoggedIn = new Boolean(false);
    Staff = new Boolean(false);
    GenView = new Boolean(false);
    res.sendFile(__dirname + "/HomePage(General).html");
});

// This is the request to view all the users that fit a specific parameter the query
app.post("/seuser", function(req, res) {
    uquery = req.body.query;
    res.sendFile(__dirname + "/users.html");
})

// This is the request that gets all the user accounts from the database and sends it to the frontend.
app.get("/seuser", function(req, res) {
    var progq = "SELECT * FROM Member_Accounts WHERE AName LIKE \'%" + uquery + "%\';";
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
})

// This is the request to view all the programs that fit a specific parameter the query
app.post("/seprog", function(req, res) {
    pquery = req.body.query;
    res.sendFile(__dirname + "/programs.html");
})

// THis is the request that gets all the programs for the database and sends them to the frontend
app.get("/seprog", function(req, res) {
    var progq = "SELECT * FROM Program WHERE Name LIKE \'%" + pquery + "%\' AND Canceled = 0;";
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
})

// This is the request that views all registration that fit a specific parameter the query.
app.post("/sereg", function(req, res) {
    rquery = req.body.query;
    ropt = req.body.ropt
    res.sendFile(__dirname + "/registration_view.html");
})

// This is the request that gets all the registrations from the database and sends them to the frontend.
app.get("/sereg", function(req, res) {
    if (ropt == "User") {
        var regq = "SELECT * FROM Member_Accounts JOIN Registration ON Member_Accounts.AccountID = Registration.MemberID JOIN Program ON Registration.ProgramID = Program.ProgramID WHERE Canceled = 0 AND AName LIKE \'%" + rquery + "%\';";
    }
    else if (ropt == "Program") {
        var regq = "SELECT * FROM Member_Accounts JOIN Registration ON Member_Accounts.AccountID = Registration.MemberID JOIN Program ON Registration.ProgramID = Program.ProgramID WHERE Canceled = 0 AND Name LIKE \'%" + rquery + "%\';";
    }
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
})

// This sends the user all the programs there is registration on.
app.get("/usprog", function(req, res) {
    var userid = 0;
    if (auth.length > 0) {
        for (let i = 0; i < auth.length; i++) {
            if (auth[i][0] == req.connection.remoteAddress) {
                userid = auth[i][1];
            }
        }
        var uspq = "SELECT * FROM Program JOIN Registration ON Program.ProgramID == Registration.ProgramID WHERE MemberID = " + userid + ";";
        db.serialize(function() {
            db.all(uspq, function(err,rows){
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
})

// This updates the status of the account to activate or delete it.
app.post("/statch", function(req, res) {
    if(req.body.stat == 1) {
        var statq = "UPDATE [Member_Accounts] SET Status = 0 WHERE AccountID = " + req.body.AccID + ";";
        var inccap = "UPDATE Program SET Capacity = Capacity + 1 WHERE ProgramID IN (SELECT ProgramID FROM Registration WHERE MemberID = " + req.body.AccID + ");";
        db.serialize(function() {
            db.all(inccap, function(err,rows){
                if(err)                    {
                    console.log(err);
                }
            });
        });
        var delreg = "DELETE FROM Registration WHERE MemberID = " + req.body.AccID + ";";
        db.serialize(function() {
            db.all(delreg, function(err,rows){
                if(err)                    {
                    console.log(err);
                }
            });
        });
    } else {
        var statq = "UPDATE [Member_Accounts] SET Status = 1 WHERE AccountID = " + req.body.AccID + ";";
    }
    db.serialize(function() {
        db.all(statq, function(err,rows){
            if(err)                    {
                console.log(err);
            }
        });
    });
    res.sendFile(__dirname + "/users.html");
});

// Sends the program viewing pages to see all the programs
app.get('/programs', function(req, res) {
    res.sendFile(__dirname + "/programs.html");
});

// This sends everything for the program.
app.get('/programs/:data', function(req, res) {
    res.sendFile(__dirname + "/" + req.params.data);
});

// This sends the user to the login page.
app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

// This sends every program that is still active.
app.get('/proover', function(req, res) {
    var progq = "SELECT * FROM Program WHERE Canceled = 0";
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

// This gets the programs details from the database and sends it to the frontend.
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

// This just responds to the responds to the request of account status.
app.get('/acc', function(req, res) {
    res.send({"Member": LoggedIn + "", "Staff": Staff + ""});
})

// This takes and authenticates the login information submitted by the user
app.post('/auth', function(req, res) {
    var name = req.body.uname;
    var password = crypto.createHash('sha256').update(req.body.psw).digest('hex');
    db.serialize(function() {
        const searchq = "SELECT * FROM Member_Accounts WHERE Email = '" + name + "' AND Password = '" + password + "' AND Status = 1;";
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
                        LoggedIn = new Boolean(true);
                        if (user[i][col[j]] == 1) {
                            if (j == 5) {
                                Staff = new Boolean(true);
                            }
                        }
                        if (j == col.length - 1) {  
                            useri = [req.connection.remoteAddress, user[0][col[2]]];
                            auth.push(useri);
                            if (Staff == Boolean(true)) {
                                res.sendFile(__dirname + "/HomePage(Staff).html");
                            } else if (LoggedIn == Boolean(true)) {
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

// Thist sends the css file for viewing a specific programs details.
app.get('/program_view/standardPage.css', function(req, res) {
    res.sendFile(__dirname + "/standardPage.css");
});

// This send the javascript file for view a specific programs details.
app.get('/program_view/program_view.js', function(req, res) {
    res.sendFile(__dirname + "/program_view.js");
});

// This tells the page what program we are looking at.
app.get('/program_view/:pname', function(req, res) {
    vProgram = req.params.pname;
    res.sendFile(__dirname + "/program_view.html");
});

// This request sends any files that are required by the HTML files.
app.get('/:data', function(req, res) {
    if (req.params.data == "HomePage(GenView).html") {
        GenView = new Boolean(true);
    }
    res.sendFile(__dirname + "/" + req.params.data);
});

// This just tells the application to listen to any requests from a certain port.
app.listen(port, function() {
    console.log('Listening on port %d', port);
})