import "./stylesheets/style.css";

import pubsub from "./pubsub";
import weatherData from "./weatherData";
import searchCityForm from "./citySearchForm";
import currentWeather from "./currentWeather";
import hourlyForecast from "./hourlyForecast";
import weekForecast from "./weekForecast";

import sunnyIcon from "./assets/icons/sunny.svg";
// document.querySelector(".day-icon").src = sunnyIcon;

document.querySelectorAll(".hour-icon").forEach((icon) => { icon.src = sunnyIcon; });

searchCityForm.render();
currentWeather.render();
// weekForecast.render();
weatherData.loadDefault("melbourne");
