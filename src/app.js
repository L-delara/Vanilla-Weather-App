function updateTime(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let currentDay = days[dayIndex];

  return `${currentDay}, ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showTemp(response) {
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#today-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windy").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-time-now").innerHTML = updateTime(
    response.data.dt * 1000
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

function findMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let findButton = document.querySelector("#find-me");
findButton.addEventListener("click", findMe);

searchCity("Lisbon");
