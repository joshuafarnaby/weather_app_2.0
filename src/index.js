import "./stylesheets/style.css";

// import pubsub from "./pubsub";
import weatherData from "./weatherData";
import searchCityForm from "./citySearchForm";
import currentWeather from "./currentWeather";
import hourlyForecast from "./hourlyForecast";
import weekForecast from "./weekForecast";

searchCityForm.render();
currentWeather.render();
hourlyForecast.render();
weekForecast.render();
weatherData.loadDefault("melbourne");
