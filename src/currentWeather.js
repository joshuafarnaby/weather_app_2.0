import sunnyIcon from "./assets/icons/sunny.svg";
import cloudIcon from "./assets/icons/cloudy.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import fogIcon from "./assets/icons/fog.svg";
import sunriseIcon from "./assets/icons/sunrise.svg";
import sunsetIcon from "./assets/icons/sunset.svg";
import gaugeIcon from "./assets/icons/gauge.svg";
import windIcon from "./assets/icons/wind.svg";
import compassIcon from "./assets/icons/compass.svg";
import thermometerLow from "./assets/icons/thermometerLow.svg";
import thermometerHigh from "./assets/icons/thermometerHigh.svg";
import thermometerCheck from "./assets/icons/thermometerCheck.svg";

import {
  kelvinToCelsius,
  kelvinToFahrenheit,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from "./utilities";

import pubsub from "./pubsub";

const currentWeather = (() => {
  const currentWeatherContainer = (() => {
    const container = document.createElement("div");
    container.classList.add("current-weather-container");

    container.innerHTML = `
      <h1 id="city-name" class="city-name"></h1>
      <h2 class="current-temp"><span id="current-temp" class="temperature"></span></h2>
      <div class="high-low">
        <p class="row-center"><img src="${thermometerLow}" alt="wind speed icon" class="weather-icon small"><span id="min-temp" class="temperature"></span></p>
        <p class="row-center"><img src="${thermometerHigh}" alt="wind speed icon" class="weather-icon small"><span id="max-temp" class="temperature"></span></p>
      </div>
      <div class="container-left info-box">
        <p class="row-center"><img src="${thermometerCheck}" alt="feels like icon" class="weather-icon small"><span id="feels-like" class="temperature"></span></p>
        <p class="row-center"><img src="${windIcon}" alt="wind speed icon" class="weather-icon small"><span id="wind-speed"></span>mph</p>
        <p class="row-center"><img src="${compassIcon}" alt="wind direction icon" class="weather-icon small"><span id="wind-direction"></span></p>
      </div>
      <div class="container-middle info-box">
        <img src="" alt="" id="weather-icon" class="weather-icon center">
        <p id="weather-description" class="center"></p>
      </div>
      <div class="container-right info-box">
        <p class="row-center"><img src="${sunriseIcon}" alt="sunrise icon" class="weather-icon small"><span id="sunrise"></span></p>
        <p class="row-center"><img src="${sunsetIcon}" alt="sunset icon" class="weather-icon small"><span id="sunset"></span></p>
        <p class="row-center"><img src="${gaugeIcon}" alt="pressure icon" class="weather-icon small"><span id="pressure"></span>hPa</p>
      </div>
    `;

    return container;
  })();

  const getDirection = (degrees) => {
    if ((degrees >= 337.5 && degrees <= 360) || (degrees >= 0 && degrees < 22.5)) return "North";
    if (degrees >= 22.5 && degrees < 67.5) return "North East";
    if (degrees >= 67.5 && degrees < 112.5) return "East";
    if (degrees >= 112.5 && degrees < 157.5) return "South East";
    if (degrees >= 157.5 && degrees < 202.5) return "South";
    if (degrees >= 202.5 && degrees < 247.5) return "South West";
    if (degrees >= 247.5 && degrees < 292.5) return "West";
    if (degrees >= 292.5 && degrees < 337.5) return "North West";

    return "Unknown";
  };

  const displayFunctions = [
    ({ cityName }) => { document.getElementById("city-name").textContent = cityName; },
    ({ temp }) => {
      document.getElementById("current-temp").textContent = document.body.classList.contains("celsius")
        ? `${kelvinToCelsius(temp)} ˚C`
        : `${kelvinToFahrenheit(temp)} ˚F`;
    },
    ({ feelsLike }) => {
      document.getElementById("feels-like").textContent = document.body.classList.contains("celsius")
        ? `${kelvinToCelsius(feelsLike)} ˚C`
        : `${kelvinToFahrenheit(feelsLike)} ˚F`;
    },
    ({ minTemp }) => {
      document.getElementById("min-temp").textContent = document.body.classList.contains("celsius")
        ? `${kelvinToCelsius(minTemp)} ˚C`
        : `${kelvinToFahrenheit(minTemp)} ˚F`;
    },
    ({ maxTemp }) => {
      document.getElementById("max-temp").textContent = document.body.classList.contains("celsius")
        ? `${kelvinToCelsius(maxTemp)} ˚C`
        : `${kelvinToFahrenheit(maxTemp)} ˚F`;
    },
    ({ description }) => { document.getElementById("weather-description").textContent = description; },
    ({ main }) => {
      const icon = document.getElementById("weather-icon");
      if (main === "Clouds") icon.src = cloudIcon;
      if (main === "Sunny" || main === "Clear") icon.src = sunnyIcon;
      if (main === "Thunderstorms") icon.src = thunderstormIcon;
      if (main === "Drizzle" || main === "Rain") icon.src = rainIcon;
      if (main === "Snow") icon.src = snowIcon;
      if (main === "Mist" || main === "Smoke"
        || main === "Haze" || main === "Dust"
        || main === "Fog" || main === "Sand"
        || main === "Ash" || main === "Tornado"
      ) icon.src = fogIcon;
    },
    ({ sunrise }) => { document.getElementById("sunrise").textContent = sunrise; },
    ({ sunset }) => { document.getElementById("sunset").textContent = sunset; },
    ({ pressure }) => { document.getElementById("pressure").textContent = pressure; },
    ({ windSpeed }) => { document.getElementById("wind-speed").textContent = windSpeed; },
    ({ windDeg }) => { document.getElementById("wind-direction").textContent = getDirection(windDeg); },
  ];

  const displayCurrentData = (data) => displayFunctions.forEach((fn) => fn(data));

  pubsub.subscribe("currentDataRetrieved", displayCurrentData);

  return {
    render() { document.body.appendChild(currentWeatherContainer); },
  };
})();

export default currentWeather;
