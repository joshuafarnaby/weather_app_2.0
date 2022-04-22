import sunnyIcon from "./assets/icons/sunny.svg";
import pubsub from "./pubsub";

document.getElementById("weather-icon").src = sunnyIcon;

const mainDisplay = (() => {
  const displayFunctions = [
    ({ cityName }) => { document.getElementById("city-name").textContent = cityName; },
    ({ temp }) => { document.getElementById("current-temp").textContent = temp; },
    ({ feelsLike }) => { document.getElementById("feels-like").textContent = feelsLike; },
    ({ minTemp }) => { document.getElementById("min-temp").textContent = minTemp; },
    ({ maxTemp }) => { document.getElementById("max-temp").textContent = maxTemp; },
  ];

  const displayCurrentData = (data) => displayFunctions.forEach((fn) => fn(data));

  pubsub.subscribe("currentDataRetrieved", displayCurrentData);
})();

export default mainDisplay;
