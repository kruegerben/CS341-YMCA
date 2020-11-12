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
            var pName = prog[0][col[0]];
            var pDate = prog[0][col[5]];
            var pTime = prog[0][col[6]];
            var pPric = "$" + prog[0][col[2]] + "/$" + prog[0][col[3]];
            var pLoca = prog[0][col[7]];
            var pDesc = prog[0][col[15]];
            var pAvai = prog[0][col[4]];
            var Name = document.getElementById("pName");
            var NTemp = Name.innerHTML;
            Name.innerHTML = NTemp + " " + pName;
            var Date = document.getElementById("pDate");
            var DTemp = Date.innerHTML;
            Date.innerHTML = DTemp + " " + pDate;
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
        }
    })

}