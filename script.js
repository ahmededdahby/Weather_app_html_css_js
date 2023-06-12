const wheatherIcon = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".tempurature-value p");
const descElement = document.querySelector(".tempurature-description p");
const locationElement = document.querySelector(".location p");
const notifElement = document.querySelector(".notification ");

var input = document.getElementById("search");
var city = "";
let lantitude = 0.0;
let longtitude = 0.0;
const key = "e48262df793c5be49247c72e7b17926f"
const weather = {}
weather.tempurature = {
    unit : "celsius"
}
const kelvin = 273

//verify if navigator support geolocation
if ("geolocation" in navigator) {
    //setposition and showerror defined below
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notifElement.style.display = "block"
    notifElement.innerHTML = "<p> browser doesnt support geolocation</p>"
}
function setPosition(position) {
    lantitude = position.coords.latitude
    longtitude = position.coords.longitude
    getWeather(lantitude,longtitude)
}
function showError(error) {
    notifElement.style.display = "block"
    notifElement.innerHTML = `<p>${error.message}</p>`
}




input.addEventListener("keyup",async function (e) {
    if (e.key === "Enter") {
        e.preventDefault;
        city = input.value;
        await getWeatherBySearch(city)
    }
});
locationIcon.addEventListener("click",async function (e) { 
    console.log("hi")
    console.log(lantitude,longtitude)
    await getWeather(lantitude,longtitude)
})



//getting using the input
function getWeatherBySearch(city) { 
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data
        })
        .then(function (data) {
            weather.tempurature.value = Math.floor(data.main.temp - kelvin)
            weather.description = data.weather[0].description
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
        })
        .then(function () {
            displayWeather()
        })
}
//getting weather using current geolocation
function getWeather(lantitude,longtitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lantitude}&lon=${longtitude}&appid=${key}`
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data
        })
        .then(function (data) {
            weather.tempurature.value = Math.floor(data.main.temp - kelvin)
            weather.description = data.weather[0].description
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
        })
        .then(function () {
            displayWeather()
        })
}
function displayWeather() {
    wheatherIcon.innerHTML = `<img src="/openweathermap-api-icons-master/icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.tempurature.value} *<span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city} , ${weather.country}`
}




