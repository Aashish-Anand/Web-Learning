let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not_found ");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");
let apiKey = '032865cb-e2e3-41b5-9689-bf352cc24b1a'; // your key should be there

searchBtn.addEventListener('click', function(e) {

    e.preventDefault(); // to stop any default behaiour to happen
    //alert(1);

    //clear data 
    audioBox.innerHTML = '';

    notFound.innerText = '';

    defBox.innerText = '';

    // Get input data 
    let word = input.value;

    // call API get data

    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})

async function getData(word) {

    loading.style.display = 'block';

    //Ajax Call 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    const data = await response.json();

    // if data is empty
    if (!data.length) {
        loading.style.display = 'none';
        notFound.innerText = 'No Result Found';
        return;
    }

    //if data is suggestion 
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = "Did you mean?"
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        })
        return;
    }

    //Result Found
    loading.style.display = 'none';
    let definition = data[0].shortdef[0];

    defBox.innerText = definition;

    //sound 
    const soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
        //sound is available
        renderSound(soundName);
    }
}

function renderSound(soundName) {
    //https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);

    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let audio = document.createElement("audio");
    audio.src = soundSrc;
    audio.controls = true;

    audioBox.appendChild(audio);

}