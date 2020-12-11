window.onload = window_onload
var pnames = [];

function window_onload() {
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

function DetailsRequest(index) {
    location.href = '/program_view/' + pnames[index];
}
