import sunnyIcon from "./assets/icons/sunny.svg";
import cloudIcon from "./assets/icons/cloudy.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import fogIcon from "./assets/icons/fog.svg";
import pubsub from "./pubsub";

document.getElementById("weather-icon").src = sunnyIcon;

const mainDisplay = (() => {
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
  ];

  const displayCurrentData = (data) => displayFunctions.forEach((fn) => fn(data));

  pubsub.subscribe("currentDataRetrieved", displayCurrentData);
})();

export default mainDisplay;
