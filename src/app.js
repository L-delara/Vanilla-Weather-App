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
function displayForecast() {
  let forecastElem = document.querySelector(".forecast");

  let days = ["Mon", "Tues", "Wed", "Thur", "Fri"];

  let forecastHTML = `<div class="card-group">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card text-center">
          <div class="card-body">
            <h5 class="forecast-date">${day}</h5>
            <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="clear" width="50">
          <br/>
          <div class = "forecast-temps">
          <span id="forecast-high-temp">A#</span> | <span id="forecast-low-temp">A#</span> °
          </div>
          </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElem.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function showTemp(response) {
  let tempElement = document.querySelector("#today-temp");
  let cityElement = document.querySelector("#current-city");
  let descriptionElem = document.querySelector("#today-description");
  let humidityElem = document.querySelector("#humidity");
  let windyElem = document.querySelector("#windy");
  let timestamp = document.querySelector("#weather-time-now");
  let actualFeel = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");

  tempF = response.data.main.temp;

  tempElement.innerHTML = Math.round(tempF);
  cityElement.innerHTML = response.data.name;
  descriptionElem.innerHTML = response.data.weather[0].description;
  humidityElem.innerHTML = response.data.main.humidity;
  windyElem.innerHTML = Math.round(response.data.wind.speed);
  timestamp.innerHTML = updateTime(response.data.dt * 1000);
  actualFeel.innerHTML = Math.round(response.data.main.feels_like);
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

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#today-temp");
  let tempC = ((tempF - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(tempC);
}
function showfahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#today-temp");
  tempElement.innerHTML = Math.round(tempF);
}
let tempF = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

searchCity("Lisbon");
displayForecast();
