import pubsub from "./pubsub";

const weatherData = (() => {
  const API_KEY = "cd1c2d65c0cb1e69529587b267dbe878";

  // const kelvinToCelsius = (temperature) => (temperature - 273.15).toFixed(1);

  const capitalise = (string) => string
    .split(" ")
    .map((word) => word.substring(0, 1).toUpperCase() + word.substring(1))
    .join(" ");

  const unixEpochToTime = (seconds, timezone) => {
    const date = new Date(seconds * 1000).toLocaleString("en-US", { timeZone: timezone });
    return date.split(" ").splice(1).join(" ");
  };

  const milesPerHour = (metersPerSecond) => (metersPerSecond * 2.2369).toFixed(1);

  const getDay = (currentDay, index) => {
    const nextDayNumber = (currentDay + index + 1) % 7;

    if (nextDayNumber === 0) return "Sunday";
    if (nextDayNumber === 1) return "Monday";
    if (nextDayNumber === 2) return "Tuesday";
    if (nextDayNumber === 3) return "Wednesday";
    if (nextDayNumber === 4) return "Thursday";
    if (nextDayNumber === 5) return "Friday";
    if (nextDayNumber === 6) return "Saturday";

    return "-";
  };

  const getHour = (currentHour, index) => (currentHour + index) % 24;

  const publishCurrentData = (cityName, {
    current, daily, timezone,
  }) => {
    pubsub.publish("currentDataRetrieved", {
      cityName: capitalise(cityName),
      temp: current.temp.toFixed(1),
      feelsLike: current.feels_like.toFixed(1),
      minTemp: daily[0].temp.min.toFixed(1),
      maxTemp: daily[0].temp.max.toFixed(1),
      humidity: current.humidity,
      pressure: current.pressure,
      sunrise: unixEpochToTime(current.sunrise, timezone),
      sunset: unixEpochToTime(current.sunset, timezone),
      uvIndex: current.uvi,
      visibility: current.visibility,
      windSpeed: milesPerHour(current.wind_speed),
      windDeg: current.wind_deg,
      description: capitalise(current.weather[0].description),
      main: current.weather[0].main,
    });
  };

  const publishHourlyData = ({ hourly, timezone_offset: timezoneOffset }) => {
    const currentHour = new Date(Date.now() + (timezoneOffset * 1000)).getUTCHours();

    pubsub.publish("hourlyDataRetrieved", hourly.slice(0, 24).map((hour, index) => ({
      hour: getHour(currentHour, index),
      temp: hour.temp.toFixed(1),
      main: hour.weather[0].main,
      description: capitalise(hour.weather[0].description),
    })));
  };

  const publishWeeklyData = ({ daily, timezone_offset: timezoneOffset }) => {
    const currentDay = new Date(Date.now() + (timezoneOffset * 1000)).getDay();

    pubsub.publish("weekForecastRetrieved", daily.slice(1).map((day, index) => ({
      day: getDay(currentDay, index),
      temp: day.temp.day.toFixed(1),
      minTemp: day.temp.min.toFixed(1),
      maxTemp: day.temp.max.toFixed(1),
      main: day.weather[0].main,
      description: capitalise(day.weather[0].description),
    })));
  };

  const publishError = () => pubsub.publish("dataFetchError", "That city wasn't found - please try again");

  const fetchWeatherData = (cityName) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error(res.statusText);
      })
      .then((data) => fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely,alert&appid=${API_KEY}`))
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error(res.statusText);
      })
      .then((data) => {
        publishCurrentData(cityName, data);
        publishHourlyData(data);
        publishWeeklyData(data);
      })
      .catch((error) => {
        console.log(error);
        publishError();
      });
  };

  const loadDefault = (cityName) => fetchWeatherData(cityName);

  pubsub.subscribe("searchFormSubmitted", fetchWeatherData);

  return {
    loadDefault,
  };
})();

export default weatherData;
