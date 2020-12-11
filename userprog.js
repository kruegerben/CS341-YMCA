document.addEventListener("DOMContentLoaded", window_onload, false);
var pnames = [];

function window_onload() {
    $("#cover").hide();
    pnames = [];
    $.ajax({
        type: 'GET',
        url: '/usprog',
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
                tabCell.innerHTML = prog[i][col[6]];
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = prog[i][col[5]];
                tabCell = tr.insertCell(-1);
                if (prog[i][col[15]] == 0) {
                    tabCell.innerHTML = "Active";
                } else {
                    tabCell.innerHTML = "Canceled";
                }
                h++;
            }
        }
    })
}

function DetailsRequest(index) {
    location.href = '/program_view/' + pnames[index];
}