window.onload = window_onload

function window_onload() {
    var url = window.location.href;

    if (url.indexOf("/auth") > -1) {
        document.getElementById("prompt").style.display = 'true';
    } else {
        document.getElementById("prompt").style.display = 'none';
    }
}