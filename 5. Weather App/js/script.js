const notificationElement = document.querySelector(".error-notification");
const iconElement = document.querySelector(".weather-icon");
const tempValueElement = document.querySelector(".temp-value p");
const weatherDescriptionElement = document.querySelector(".weather-description p");
const locationElement = document.querySelector(".location p");
const cityName = document.querySelector(".cityName");
const submitCity = document.querySelector(".submitCity");

const weatherData = {};

weatherData.temperature = {
    unit: "celsius"
}

const apiKey = ""; // use your own api key from https://openweathermap.org/api

async function fetchTemperaturByCity(locationToFind) {

    let api = `http://api.openweathermap.org/data/2.5/weather?q=${locationToFind}&appid=${apiKey}`;

    const response = await fetch(api);
    const data = await response.json();
    if (data.cod === '404') {
        notificationElement.style.display = "flex";
        notificationElement.innerHTML = `<img style="width:26px; margin-top:-2px;" src="icons/warning.png"/>  <p style="margin-left:4px;">City Not Found !!!!</p>`;
        return;
    }
    console.log(data);

    weatherData.temperature.value = Math.floor(data.main.temp - 273);
    weatherData.description = data.weather[0].description;
    weatherData.icon = data.weather[0].icon;
    weatherData.city = data.name;
    weatherData.country = data.sys.country;

    displayWeatherOnPage();
    console.log(weatherData);
}

function displayWeatherOnPage() {
    notificationElement.style.display = "none";

    console.log(weatherData.icon);
    iconElement.innerHTML = `<img src="icons/${weatherData.icon}.png" style="filter:contrast(100%);">`;
    tempValueElement.innerHTML = weatherData.temperature.value + "°c";
    weatherDescriptionElement.innerHTML = weatherData.description;
    locationElement.innerHTML = weatherData.city + ", " + weatherData.country;
}

tempValueElement.addEventListener("click", function() {

    if (weatherData.temperature.value === undefined) return;

    if (weatherData.temperature.unit === 'celsius') {
        var fahrenheit = (weatherData.temperature.value * (9 / 5)) + 32;
        fahrenheit = Math.floor(fahrenheit);

        tempValueElement.innerHTML = fahrenheit + "°f";
        weatherData.temperature.unit = 'fahrenheit';
    } else {
        tempValueElement.innerHTML = weatherData.temperature.value + "°c";
        weatherData.temperature.unit = 'celsius';
    }
});

submitCity.addEventListener('click', function() {
    if (cityName.value === '') {
        alert("Please enter cityname.");
        return;
    }

    fetchTemperaturByCity(cityName.value);
    cityName.value = "";
});