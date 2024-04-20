// API key for OpenWeatherMap
const apiKey = "d6767b3e7d86911135b528f0ca63d8a1";
// Base URL for OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting elements from the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather for a given city
async function checkWeather(city) {
    // Fetching weather data from OpenWeatherMap API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Handling response based on HTTP status code
    if (response.status == 404) {
        // Displaying error message if city not found
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parsing JSON response
        var data = await response.json();

        // Updating weather information in the DOM
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Updating weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Displaying weather information
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

// Link to Open Weather Current Weather Data API doc -> https://openweathermap.org/current
// References -> https://dev.to/iamcymentho/building-a-complete-weather-app-from-scratch-with-html-css-and-javascript-a-step-by-step-guide-30h4
