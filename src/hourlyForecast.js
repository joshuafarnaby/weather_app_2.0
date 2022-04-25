import pubsub from "./pubsub";
import sunnyIcon from "./assets/icons/sunny.svg";
import cloudIcon from "./assets/icons/cloudy.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import fogIcon from "./assets/icons/fog.svg";
import rightIcon from "./assets/icons/right.svg";
import leftIcon from "./assets/icons/left.svg";

const hourlyForecast = (() => {
  const hourlyForecastWrapper = (() => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("hour-section-wrapper");

    wrapper.innerHTML = `
      <button id="left-btn"><img src="${leftIcon}" alt="" id="left-btn-icon" class="direction-icon"></button>
      <div class="hour-card-container"></div>
      <button id="right-btn"><img src="${rightIcon}" alt="" id="right-btn-icon" class="direction-icon"></button>
    `;

    return wrapper;
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

  const displayHourlyForecast = (forecastData) => {
    if (!hourlyForecastWrapper.querySelector(".hour-card-container").hasChildNodes()) {
      forecastData.forEach((hour, index) => {
        hourlyForecastWrapper.querySelector(".hour-card-container").innerHTML += `
          <div class="hour-forecast-card">
            <p class="hour">${index === 0 ? "Now" : hour.hour}</p>
            <div class="hour-icon-container">
              <img src="${getIcon(hour.main)}" alt="" class="hour-icon">
              <p class="hour-description">${hour.description}</p>
            </div>
            <p><span class="hour-temp">${hour.temp}</span><span class="degree">˚C</span></p>
          </div>
        `;
      });
    } else {
      const hourForecastCards = hourlyForecastWrapper.querySelector(".hour-card-container").children;

      for (let i = 0; i < 24; i += 1) {
        hourForecastCards[i].querySelector(".hour").innerText = i === 0 ? "Now" : forecastData[i].hour;
        hourForecastCards[i].querySelector(".hour-icon").src = getIcon(forecastData[i].main);
        hourForecastCards[i].querySelector(".hour-description").innerText = forecastData[i].description;
        hourForecastCards[i].querySelector(".hour-temp").innerText = forecastData[i].temp;
      }
    }
  };

  const scrollRight = () => { hourlyForecastWrapper.querySelector(".hour-card-container").scrollLeft += 600; };
  const scrollLeft = () => { hourlyForecastWrapper.querySelector(".hour-card-container").scrollLeft -= 600; };

  pubsub.subscribe("hourlyDataRetrieved", displayHourlyForecast);

  hourlyForecastWrapper.querySelector("#right-btn").addEventListener("click", scrollRight);
  hourlyForecastWrapper.querySelector("#left-btn").addEventListener("click", scrollLeft);

  return {
    render() {
      document.body.appendChild(hourlyForecastWrapper);
    },
  };
})();

export default hourlyForecast;
