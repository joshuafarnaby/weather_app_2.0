import sunnyIcon from "./assets/icons/sunny.svg";
import pubsub from "./pubsub";

document.getElementById("weather-icon").src = sunnyIcon;

const mainDisplay = (() => {
  const displayCurrentData = (data) => {
    document.getElementById("city-name").textContent = data.cityName;
    document.getElementById("current-temp").textContent = data.temp;
  };

  pubsub.subscribe("currentDataRetrieved", displayCurrentData);
})();

export default mainDisplay;
