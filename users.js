window.onload = window_onload
var anames = [];
var accstat = [];

function window_onload() {
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
                tabCell.innerHTML = acc[i][col[2]]
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = acc[i][col[3]];
                anames.push(acc[i][col[3]]);
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = acc[i][col[0]];
                tabCell = tr.insertCell(-1);
                var statb = document.createElement("button");
                accstat.push(acc[i][col[6]])
                if (accstat[h] == 1) {
                    statb.innerHTML = "Delete";
                } else {
                    statb.innerHTML = "Reactivate";
                }
                tabCell.appendChild(statb);
                tabCell.setAttribute("onclick", "javascript:UpdateStat("+h+")");
                h++;
            }
        }
    })
}

function UpdateStat(index) {
    if (accstat[index] == 1) {
        if (!confirm("You are suspending this account")) return;
    } else {
        if (!confirm("You are reactivating this account")) return;
    }
}