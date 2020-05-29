let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");

searchBtn.addEventListener('click', function(e) {
    e.preventDefault(); // to stop any default behaiour to happen
    alert(1);


    // Get input data 
    let word = input.value;



    // call API get data

    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})

funtion getData(word)[
    //Ajax Call 
]