/**
 * Author: Benjamin Krueger
 * 
 * This program is called to show the staff all registration
 */
window.onload = window_onload
var pnames = [];

//This function is called to load in every registration on file
function window_onload() {
    pnames = [];
    var url = window.location.href;

    if (url.indexOf("/sereg") > -1) {
        $.ajax({
            type: 'GET',
            url: '/sereg',
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
    
                var tbody = document.getElementById("registration");
                var h = 0
                for (var i = 0; i < prog.length; i++) {
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[10]];
                    pnames.push(prog[i][col[9]]);
                    tabCell.setAttribute("onclick", "javascript:DetailsRequest("+h+")");
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[3]];
                    h++;
                }
            }
        })
    }   else {
        $.ajax({
            type: 'GET',
            url: '/regover',
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
    
                var tbody = document.getElementById("registration");
                var h = 0
                for (var i = 0; i < prog.length; i++) {
                    tr = tbody.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[10]];
                    pnames.push(prog[i][col[9]]);
                    tabCell.setAttribute("onclick", "javascript:DetailsRequest("+h+")");
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = prog[i][col[3]];
                    h++;
                }
            }
        })
    }
}

/**
 * This function moves the user to the details page for whatever program they clicked.
 * 
 * @param index - this is the program index so that the user is directed to the right program 
 */
function DetailsRequest(index) {
    location.href = '/program_view/' + pnames[index];
}
