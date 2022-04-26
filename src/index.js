import "./stylesheets/style.css";

import weatherData from "./weatherData";
import searchCityForm from "./citySearchForm";
import currentWeather from "./currentWeather";
import hourlyForecast from "./hourlyForecast";
import weekForecast from "./weekForecast";
import degreeButtons from "./degreeButtons";
import pubsub from "./pubsub";
import { celsiusToFahrenheit, fahrenheitToCelsius } from "./utilities";

(() => {
  // let degreeMode = "celsius";
  document.body.classList.add("celsius");

  searchCityForm.render();
  currentWeather.render();
  hourlyForecast.render();
  weekForecast.render();
  degreeButtons.render();
  weatherData.loadDefault("melbourne");

  const switchDegreeMode = (newDegreeMode) => {
    if (document.body.getAttribute("class") === newDegreeMode) return;

    document.querySelectorAll(".temperature").forEach((tempDisplayElement) => {
      const currentTemp = Number(tempDisplayElement.textContent.split(" ")[0]);

      if (newDegreeMode === "celsius") {
        tempDisplayElement.textContent = `${fahrenheitToCelsius(currentTemp)} ˚C`;
      } else {
        tempDisplayElement.textContent = `${celsiusToFahrenheit(currentTemp)} ˚F`;
      }
    });

    document.body.setAttribute("class", newDegreeMode);
  };

  pubsub.subscribe("degreeChange", switchDegreeMode);
})();
