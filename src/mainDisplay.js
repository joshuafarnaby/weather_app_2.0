import sunnyIcon from "./assets/icons/sunny.svg";
import cloudIcon from "./assets/icons/cloudy.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import fogIcon from "./assets/icons/fog.svg";
import pubsub from "./pubsub";

const mainDisplay = (() => {
  const currentWeather = (() => {
    const container = document.createElement("div");
    container.classList.add("current-weather-container");

    container.innerHTML = `
      <h1 id="city-name" class="city-name"></h1>
      <h2  class="current-temp"><span id="current-temp"></span><span class="degree-symbol">˚C</span></h2>
      <div class="container-tl info-box">
        <p>Feels like: <span id="feels-like"></span><span class="degree-symbol">˚C</span></p>
        <p>Low: <span id="min-temp"></span><span class="degree-symbol">˚C</span></p>
        <p>High: <span id="max-temp"></span><span class="degree-symbol">˚C</span></p>
      </div>
      <div class="container-tr info-box">
        <img src="" alt="" id="weather-icon" class="weather-icon center">
        <p id="weather-description" class="center"></p>
      </div>
      <div class="container-bl info-box">
        <p>Wind speed: <span id="wind-speed"></span>mph</p>
        <p>Direction: <span id="wind-direction"></span>deg</p>
      </div>
      <div class="container-br info-box">
        <p>Sunrise: <span id="sunrise"></span></p>
        <p>Sunset: <span id="sunset"></span></p>
        <p >Pressure: <span id="pressure"></span>hPa</p>
      </div>
    `;

    return container;
  })();

  const displayFunctions = [
    ({ cityName }) => { document.getElementById("city-name").textContent = cityName; },
    ({ temp }) => { document.getElementById("current-temp").textContent = temp; },
    ({ feelsLike }) => { document.getElementById("feels-like").textContent = feelsLike; },
    ({ minTemp }) => { document.getElementById("min-temp").textContent = minTemp; },
    ({ maxTemp }) => { document.getElementById("max-temp").textContent = maxTemp; },
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
    ({ windDeg }) => { document.getElementById("wind-direction").textContent = windDeg; },
  ];

  const displayCurrentData = (data) => displayFunctions.forEach((fn) => fn(data));

  pubsub.subscribe("currentDataRetrieved", displayCurrentData);

  return {
    renderCurrentWeather() { document.body.appendChild(currentWeather); },
  };
})();

export default mainDisplay;
