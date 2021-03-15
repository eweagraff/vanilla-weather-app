function formatDate(timestamp) {
    let date = new Date(timestamp);
}

function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemer",
  "October",
  "November",
  "December"
];

let now = new Date();
let weekDays = day[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let time = `${hours}:${minutes}`;
let year = now.getFullYear();
let month = months[now.getMonth()];
let date = now.getDate();

let currentDay = document.querySelector("#date");
let currentTime = document.querySelector("#time");

currentDay.innerHTML = `${weekDays} ${month} ${date},  ${year} `;
currentTime.innerHTML = `${time}`;


function displayTemperature(response) {
 console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-type").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);

}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null; 

    for (let index = 0; index < 5; index++) {
       forecast = response.data.list[index]; 
   forecastElement.innerHTML += `<div class="col-2"> 
   <h3>
   ${formatHours(forecast.dt * 1000)}
   </h3>
   <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
   <div class ="row-weather-forecast">
   <strong>
   ${Math.round(forecast.main.temp_max)}°
   </strong>
   ${Math.round(forecast.main.temp_min)}°
   </div>
   </div>`;
    }
   }


function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  let apiKey = "0c802c8424d5c53d49a3fab3fa08b431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

let form = document.querySelector("#enterCitySearch");
form.addEventListener("submit", citySearch);