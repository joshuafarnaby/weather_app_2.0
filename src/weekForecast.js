import sunnyIcon from "./assets/icons/sunny.svg";
import cloudIcon from "./assets/icons/cloudy.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import fogIcon from "./assets/icons/fog.svg";
import thermometerLow from "./assets/icons/thermometerLow.svg";
import thermometerHigh from "./assets/icons/thermometerHigh.svg";
import pubsub from "./pubsub";

import {
  kelvinToCelsius,
  kelvinToFahrenheit,
} from "./utilities";

const weekForecast = (() => {
  const weekForecastContainer = (() => {
    const container = document.createElement("div");
    container.classList.add("week-forecast-container");

    for (let i = 0; i < 6; i += 1) {
      container.innerHTML += `
        <div class="day-forecast-container border-bottom">
          <h2 class="day"></h2>
          <div class="img-container">
            <img src="" alt="" class="day-icon">
          </div>
          <p class="day-description"></p>
          <p class="row-end-center"><img src="${thermometerLow}" alt="wind speed icon" class="weather-icon small"><span class="day-min-temp temperature"></span></p>
          <p class="row-end-center"><img src="${thermometerHigh}" alt="wind speed icon" class="weather-icon small"><span class="day-max-temp temperature"></span></p>
        </div>
      `;
    }

    return container;
  })();

  const getIcon = (description) => {
    if (description === "Clouds") return cloudIcon;
    if (description === "Sunny" || description === "Clear") return sunnyIcon;
    if (description === "Thunderstorms") return thunderstormIcon;
    if (description === "Drizzle" || description === "Rain") return rainIcon;
    if (description === "Snow") return snowIcon;
    if (description === "Mist" || description === "Smoke"
      || description === "Haze" || description === "Dust"
      || description === "Fog" || description === "Sand"
      || description === "Ash" || description === "Tornado"
    ) return fogIcon;

    return "-";
  };

  const displayWeekForecast = (forecastData) => {
    const days = weekForecastContainer.querySelectorAll(".day-forecast-container");

    for (let i = 0; i < days.length; i += 1) {
      days[i].querySelector(".day").textContent = forecastData[i].day;
      days[i].querySelector(".day-icon").src = getIcon(forecastData[i].main);
      days[i].querySelector(".day-description").textContent = forecastData[i].description;
      days[i].querySelector(".day-min-temp").textContent = document.body.classList.contains("celsius")
        ? `${kelvinToCelsius(forecastData[i].minTemp)} ˚C`
        : `${kelvinToFahrenheit(forecastData[i].minTemp)} ˚F`;

      days[i].querySelector(".day-max-temp").textContent = document.body.classList.contains("celsius")
        ? `${kelvinToCelsius(forecastData[i].maxTemp)} ˚C`
        : `${kelvinToFahrenheit(forecastData[i].maxTemp)} ˚F`;
    }
  };

  pubsub.subscribe("weekForecastRetrieved", displayWeekForecast);

  return {
    render() {
      document.body.appendChild(weekForecastContainer);
    },
  };
})();

export default weekForecast;
