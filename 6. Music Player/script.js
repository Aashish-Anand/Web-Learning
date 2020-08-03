music_name = "music.mp3";
let cover = document.querySelector("#cover")
let play_btn = document.querySelector("#play");
let prev_btn = document.querySelector("#pre");
let next_btn = document.querySelector("next");
let range = document.querySelector("#range");
let play_img = document.querySelector("#play_img");
let songName = document.querySelector("#song");
let search = document.querySelector("#search");
let total_time = 0;
let currentTime = 0;
let isPlaying = false;
let song = new Audio();

search.addEventListener('click', function() {
    playSong(songName.value);
})

async function playSong(playSong) {

    console.log(playSong);
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${playSong}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "dffd8fabe4msh4bdc8d0e1d04d7fp1f67a3jsn752c64783a27"
        }
    });

    const jsonResponse = await response.json();
    console.log("Json response : " + jsonResponse);

    console.log(jsonResponse.data[0]);
    cover.src = jsonResponse.data[0].album.cover_medium;
    song.src = jsonResponse.data[0].preview;

    console.log(song);
    song.play();
    play_img.src = "images/pause.png";

    play_btn.addEventListener('click', function() {
            if (!isPlaying) {
                song.play();
                isPlaying = true;
                total_time = song.duration;
                range.max = total_time;
                play_img.src = "images/pause.png";
            } else {
                song.pause();
                isPlaying = false;
                play_img.src = "images/play.png";
            }

            song.addEventListener('ended', function() {
                song.currentTime = 0;
                song.pause();
                isPlaying = false;
                range.value = 0;
                play_img.src = "images/play.png";
            });

            song.addEventListener('timeupdate', function() {
                range.value = song.currentTime;
            })

            range.addEventListener('change', function() {
                song.currentTime = range.value;
            })

        })
        // myFunc();
}

// async function myFunc() {

//     const response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=malang", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//             "x-rapidapi-key": "dffd8fabe4msh4bdc8d0e1d04d7fp1f67a3jsn752c64783a27"
//         }
//     });


//     const jsonResponse = await response.json();

//     cnosole.log(jsonResponse.data[0]);
//     cover.src = jsonResponse.data[0].album.cover_medium;
//     song.src = jsonResponse.data[0].preview;
// }