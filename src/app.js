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

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  let apiKey = "0c802c8424d5c53d49a3fab3fa08b431";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#enterCitySearch");
form.addEventListener("submit", citySearch);