let timer = document.getElementById("timer");
let startb = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");

var startTime;
var timeInterval;
var alreadyStarted;
var diff;

startb.addEventListener("click", function startTimer() {

    startTime = new Date().getTime();
    timeInterVal = setInterval(updateTime, 1);

});

pause.addEventListener("click", function pauseTimer() {
    clearInterval(timeInterVal);
});

reset.addEventListener("click", function() {
    clearInterval(timeInterVal);
    timer.innerHTML = "00:00:00:000";
});

function updateTime() {

    var currentTime = new Date().getTime();

    // if (savedTime) {
    //     diff = (currentTime - startTime) + savedTime;
    //     console.log(diff + " already");
    // } else {
    //     diff = currentTime - startTime;
    //     console.log(diff + " not");
    // }

    diff = currentTime - startTime;
    console.log(currentTime + " " + startTime + " " + diff);
    //var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((diff % (1000 * 60)) / 100);


    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;

    console.log(hours + ":" + minutes + ":" + seconds + ":" + milliseconds);
    //timer.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}