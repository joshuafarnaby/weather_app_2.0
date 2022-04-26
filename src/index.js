import "./stylesheets/style.css";

import weatherData from "./weatherData";
import searchCityForm from "./citySearchForm";
import currentWeather from "./currentWeather";
import hourlyForecast from "./hourlyForecast";
import weekForecast from "./weekForecast";
import degreeButtons from "./degreeButtons";
import pubsub from "./pubsub";

(() => {
  let degreeMode = "celsius";

  searchCityForm.render();
  currentWeather.render();
  hourlyForecast.render();
  weekForecast.render();
  degreeButtons.render();
  weatherData.loadDefault("melbourne");

  const switchDegreeMode = (newDegreeMode) => {
    if (degreeMode === newDegreeMode) return;

    document.querySelectorAll(".temperature").forEach((tempDisplayElement) => {
      const currentTemp = Number(tempDisplayElement.textContent);

      if (newDegreeMode === "celsius") {
        tempDisplayElement.textContent = ((currentTemp - 32) * (5 / 9)).toFixed(1);
        tempDisplayElement.nextElementSibling.textContent = "˚C";
      } else {
        tempDisplayElement.textContent = ((currentTemp * (9 / 5)) + 32).toFixed(1);
        tempDisplayElement.nextElementSibling.textContent = "˚F";
      }
    });

    degreeMode = newDegreeMode;
  };

  pubsub.subscribe("degreeChange", switchDegreeMode);
})();
