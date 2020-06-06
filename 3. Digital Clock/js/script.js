let clock = document.getElementById("clock");
let meridian = "AM";

function getTime() {
    let date = new Date();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours > 12) {
        meridian = "PM";
    }
    hours = hours % 12;

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    let time = hours + ":" + minutes + ":" + seconds + " " + meridian + "!";
    clock.innerText = time;
}

setInterval(getTime, 1000);