/*
Author: Benjamin Krueger

This programs loads in and shows every program available.
*/
window.onload = window_onload
var pnames = [];

// This function loads in every program and loads create button to view their details
function window_onload() {
    pnames = [];
    var url = window.location.href;

    if (url.indexOf("/seprog") > -1) {
        $.ajax({
            type: 'GET',
            url: '/seprog',
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
    
                var tbody = document.getElementById("programs");
                var h = 0
                for (var i = 0; i < prog.length; i++) {
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[0]];
                    pnames.push(prog[i][col[1]]);
                    tabCell.setAttribute("onclick", "javascript:DetailsRequest("+h+")");
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[5]] + ", " + prog[i][col[6]];
                    h++;
                }
            }
        })
    }   else {
        $.ajax({
            type: 'GET',
            url: '/proover',
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
    
                var tbody = document.getElementById("programs");
                var h = 0
                for (var i = 0; i < prog.length; i++) {
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[0]];
                    pnames.push(prog[i][col[1]]);
                    tabCell.setAttribute("onclick", "javascript:DetailsRequest("+h+")");
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[5]] + ", " + prog[i][col[6]];
                    h++;
                }
            }
        })
    }
}

// This function is called when the user taps on a program this will go to the details page.
function DetailsRequest(index) {
    location.href = '/program_view/' + pnames[index];
}