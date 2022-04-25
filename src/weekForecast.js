import sunnyIcon from "./assets/icons/sunny.svg";
import cloudIcon from "./assets/icons/cloudy.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import fogIcon from "./assets/icons/fog.svg";
import pubsub from "./pubsub";

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
          <div class="end">Low: <span class="day-min-temp"></span><span class="degree-container">˚C</span></div>
          <div class="end">High: <span class="day-max-temp"></span><span class="degree-container">˚C</span></div>
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
      days[i].querySelector(".day-min-temp").textContent = forecastData[i].minTemp;
      days[i].querySelector(".day-max-temp").textContent = forecastData[i].maxTemp;
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
