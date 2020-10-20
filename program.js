window.onload = window_onload

function window_onload() {
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

            for (var i = 0; i < prog.length; i++) {
                tr = tbody.insertRow(-1);
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = prog[i][col[0]];
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = prog[i][col[5]] + " " + prog[i][col[6]];
            }
        }
    })
}