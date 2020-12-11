var programId = 0;
var Dayb = [0,0,0,0,0,0,0];
window.onload = window_onload

function window_onload() {
    $.ajax({
        type: 'GET',
        url: '/prodet',
        data: JSON,
        success: function(data) {
            var prog = data;
            var col = [];
            for (var i = 0; i < prog.length; i++) {
                for (var key in prog[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            var pDays = "";
            if (prog[0][col[8]] == 1) {
                pDays += "Sunday";
                Dayb[0] = 1;
            } 
            if (prog[0][col[9]] == 1 && pDays == "") {
                pDays += "Monday";
                Dayb[1] = 1;
            } else if (prog[0][col[9]] == 1) {
                pDays += ", Monday";
                Dayb[1] = 1;
            }
            if (prog[0][col[10]] == 1 && pDays == "") {
                pDays += "Tuesday";
                Dayb[2] = 1;
            } else if (prog[0][col[10]] == 1) {
                pDays += ", Tuesday";
                Dayb[2] = 1;
            }
            if (prog[0][col[11]] == 1 && pDays == "") {
                pDays += "Wednesday";
                Dayb[3] = 1;
            } else if (prog[0][col[11]] == 1) {
                pDays += ", Wednesday";
                Dayb[3] = 1;
            }
            if (prog[0][col[12]] == 1 && pDays == "") {
                pDays += "Thursday";
                Dayb[4] = 1;
            } else if (prog[0][col[12]] == 1) {
                pDays += ", Thursday";
                Dayb[4] = 1;
            }
            if (prog[0][col[13]] == 1 && pDays == "") {
                pDays += "Friday";
                Dayb[5] = 1;
            } else if (prog[0][col[13]] == 1) {
                pDays += ", Friday";
                Dayb[5] = 1;
            }
            if (prog[0][col[14]] == 1 && pDays == "") {
                pDays += "Saturday";
                Dayb[6] = 1;
            } else if (prog[0][col[14]] == 1){
                pDays += ", Saturday";
                Dayb[6] = 1;
            }
            programId = prog[0][col[1]];
            var pName = prog[0][col[0]];
            var pDate = prog[0][col[5]];
            var pTime = prog[0][col[6]];
            var pPric = "$" + prog[0][col[2]] + "/$" + prog[0][col[3]];
            var pLoca = prog[0][col[7]];
            var pDesc = prog[0][col[16]];
            var pAvai = prog[0][col[4]];
            var Name = document.getElementById("pName");
            var NTemp = Name.innerHTML;
            Name.innerHTML = NTemp + " " + pName;
            var Date = document.getElementById("pDate");
            var DTemp = Date.innerHTML;
            Date.innerHTML = DTemp + " " + pDate;
            var Days = document.getElementById("pDay");
            var DaTemp = Days.innerHTML;
            Days.innerHTML = DaTemp + " " + pDays;
            var Time = document.getElementById("pTime");
            var TTemp = Time.innerHTML;
            Time.innerHTML = TTemp + " " + pTime;
            var Price = document.getElementById("pPric");
            var PTemp = Price.innerHTML;
            Price.innerHTML = PTemp + " " + pPric;
            var Location = document.getElementById("pLoca");
            var LTemp = Location.innerHTML;
            Location.innerHTML = LTemp + " " + pLoca;
            var Description = document.getElementById("pDesc");
            var DeTemp = Description.innerHTML;
            Description.innerHTML = DeTemp + " " + pDesc;
            var Available = document.getElementById("pAvai");
            var ATemp = Available.innerHTML;
            Available.innerHTML = ATemp + " " + pAvai;
            rForm = document.getElementById("pId");
            rForm.value = prog[0][col[1]];
            cForm = document.getElementById("pcId");
            cForm.value = prog[0][col[1]];
            rButton = document.getElementById("pReg");
            cButton = document.getElementById("pCan");
            cButton.style.visibility="hidden";
            if (prog[0][col[4]] > 0 && prog[0][col[15]] == 0) {
                checkAccount(rButton);
            } else if (prog[0][col[15]] == 0) {
                checkAccount(rButton);
            } else {
                rButton.innerHTML = "Class Unavailable"
            }
        }
    })

}

function checkAccount(button) {
    $.ajax({
        type: 'GET',
        url: '/regcheck',
        data: JSON,
        success: function(data) {
            var prog = data;
            if (prog.length > 0) {
                var col = [];
                for (var i = 0; i < prog.length; i++) {
                    for (var key in prog[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                for (i = 0; i < prog.length; i++) {
                    if (programId == prog[i][col[9]]) {
                        button.innerHTML = "Registered"
                        i = prog.length;
                    } else {
                        for (j = 17; j < 24; j++) {
                            t = j - 17;
                            if (Dayb[t] == prog[i][col[j]] && Dayb[t] == 1 && prog[i][col[15]] == 0) {
                                button.innerHTML = "Conflict";
                                j = 27;
                            } if (j == 23 && Dayb[t] != 1) {
                                button.setAttribute("onclick", "javascript:this.parentNode.submit()");
                            }
                        }
                    }
                }
            } else {
                checklog(button);
            }
        }
    })
}

function checklog(button) {
    $.ajax({
        type: 'GET',
        url: '/aauth',
        data: JSON,
        success: function(data) {
            var prog = data;
            if (prog == undefined || prog.length < 1) {
                button.innerHTML = "Please Sign In"
            } else {
                var col = [];
                for (var i = 0; i < prog.length; i++) {
                    for (var key in prog[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                for (i = 0; i < prog.length; i++) {
                    for (var t = 0; t < col.length; t++) {
                        if (t == 5) {
                            if (prog[i][col[t]] == 1) {
                                button.innerHTML = "Switch to nonstaff account";
                                button.style.visibility="hidden";
                                cButton = document.getElementById("pCan");
                                cButton.style.visibility="visible";
                                cButton.setAttribute("onclick", "javascript:Cancel(this)");
                            } else {
                                button.setAttribute("onclick", "javascript:Register(this)");
                            }
                        }
                    }
                }
            }
        }
    })
}

function Cancel(can) {
    if(!confirm("You are about to cancel this class.")) return;
    can.parentNode.submit();
}

function Register(reg) {
    if(!confirm("You are about to register for this class.")) return;
    reg.parentNode.submit();
}