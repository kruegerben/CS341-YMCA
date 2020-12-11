document.addEventListener("DOMContentLoaded", window_onload, false);
var anames = [];
var accstat = [];

function window_onload() {
    $("#cover").hide();
    anames = [];
    accstat = [];
    var url = window.location.href;

    if (url.indexOf("/seuser") > -1) {
        $.ajax({
            type: 'GET',
            url: '/seuser',
            data: JSON,
            success: function(data) {
                var acc = data;
                var col = [];
                for (var i = 0; i < acc.length; i++) {
                    for (var key in acc[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                var h = 0;
                var tbody = document.getElementById("accounts");
                for (var i = 0; i < acc.length; i++) {
                    accstat.push(acc[i][col[6]]);
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[2]]
                    tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[3]];
                    anames.push(acc[i][col[3]]);
                    tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[0]];
                    tabCell = tr.insertCell(-1);
                    var statf = document.createElement("form");
                    tabCell.appendChild(statf);
                    tabCell = statf;
                    tabCell.method = "post";
                    tabCell.setAttribute("action", "statch");
                    var info = document.createElement("input");
                    info.setAttribute("type", "hidden");
                    info.setAttribute("name", "AccID");
                    info.value = acc[i][col[2]];
                    tabCell.appendChild(info);
                    var info = document.createElement("input");
                    info.setAttribute("type", "hidden");
                    info.setAttribute("name", "stat");
                    info.value = accstat[h];
                    tabCell.appendChild(info);
                    var statb = document.createElement("button");
                    statb.type = "button";
                    tabCell.appendChild(statb);
                    if (accstat[h] == 1) {
                        statb.innerHTML = "Delete";
                    } else {
                        statb.innerHTML = "Reactivate";
                    }
                    statb.setAttribute("onClick", "SubForm("+ h +", this)");
                    tabCell.appendChild(statb);
                    h++;
                }
            }
        })
    }   else if (url.indexOf("/statch") > -1) {
        $.ajax({
            type: 'GET',
            url: '/accview',
            data: JSON,
            success: function(data) {
                var acc = data;
                var col = [];
                for (var i = 0; i < acc.length; i++) {
                    for (var key in acc[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                var h = 0;
                var tbody = document.getElementById("accounts");
                for (var i = 0; i < acc.length; i++) {
                    accstat.push(acc[i][col[6]]);
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[2]]
                    tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[3]];
                    anames.push(acc[i][col[3]]);
                    tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[0]];
                    tabCell = tr.insertCell(-1);
                    var statf = document.createElement("form");
                    tabCell.appendChild(statf);
                    tabCell = statf;
                    tabCell.method = "post";
                    tabCell.setAttribute("action", "statch");
                    var info = document.createElement("input");
                    info.setAttribute("type", "hidden");
                    info.setAttribute("name", "AccID");
                    info.value = acc[i][col[2]];
                    tabCell.appendChild(info);
                    var info = document.createElement("input");
                    info.setAttribute("type", "hidden");
                    info.setAttribute("name", "stat");
                    info.value = accstat[h];
                    tabCell.appendChild(info);
                    var statb = document.createElement("button");
                    statb.type = "button";
                    tabCell.appendChild(statb);
                    if (accstat[h] == 1) {
                        statb.innerHTML = "Delete";
                    } else {
                        statb.innerHTML = "Reactivate";
                    }
                    statb.setAttribute("onClick", "SubForm("+ h +", this)");
                    tabCell.appendChild(statb);
                    h++;
                }
            }
        })
    }   else {
        $.ajax({
            type: 'GET',
            url: '/accview',
            data: JSON,
            success: function(data) {
                var acc = data;
                var col = [];
                for (var i = 0; i < acc.length; i++) {
                    for (var key in acc[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                var h = 0;
                var tbody = document.getElementById("accounts");
                for (var i = 0; i < acc.length; i++) {
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[2]]
                    tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[3]];
                    anames.push(acc[i][col[3]]);
                    tabCell = tr.insertCell(-1);
                    if (accstat[h] == 0) {
                        displayDel(tabCell);
                    }
                    tabCell.innerHTML = acc[i][col[0]];
                    tabCell = tr.insertCell(-1);
                    accstat.push(acc[i][col[6]]);
                    var statf = document.createElement("form");
                    tabCell.appendChild(statf);
                    tabCell = statf;
                    tabCell.method = "post";
                    tabCell.setAttribute("action", "statch");
                    var info = document.createElement("input");
                    info.setAttribute("type", "hidden");
                    info.setAttribute("name", "AccID");
                    info.value = acc[i][col[2]];
                    tabCell.appendChild(info);
                    var info = document.createElement("input");
                    info.setAttribute("type", "hidden");
                    info.setAttribute("name", "stat");
                    info.value = accstat[h];
                    tabCell.appendChild(info);
                    var statb = document.createElement("button");
                    statb.type = "button";
                    tabCell.appendChild(statb);
                    if (accstat[h] == 1) {
                        statb.innerHTML = "Delete";
                    } else {
                        statb.innerHTML = "Reactivate";
                    }
                    statb.setAttribute("onClick", "SubForm("+ h +", this)");
                    tabCell.appendChild(statb);
                    h++;
                }
            }
        })
    }
}

function displayDel(el) {
    el.style.color = "red";
}

function SubForm(index, button) {
    var r = false;
    var r = confirmSubmit(index);
    if (r == true) {
        button.parentNode.submit();
    } else {
        return;
    }
}

function confirmSubmit(index)
{
    if (accstat[index] == 1) {
        return confirm("You are suspending this account");
    } else {
        return confirm("You are reactivating this account");
    }
}