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

  const publishRelevantCurrentData = (cityName, {
    current, daily, timezone,
  }) => {
    // console.log(new Date().toLocaleString("en-US", { timezone }));

    pubsub.publish("currentDataRetrieved", {
      cityName: capitalise(cityName),
      // temp: kelvinToCelsius(current.temp),
      // feelsLike: kelvinToCelsius(current.feels_like),
      // minTemp: kelvinToCelsius(daily[0].temp.min),
      // maxTemp: kelvinToCelsius(daily[0].temp.max),
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

    console.log({
      cityName,
      // temp: kelvinToCelsius(current.temp),
      // feelsLike: kelvinToCelsius(current.feels_like),
      // minTemp: kelvinToCelsius(daily[0].temp.min),
      // maxTemp: kelvinToCelsius(daily[0].temp.max),
      temp: current.temp,
      feelsLike: current.feels_like,
      minTemp: daily[0].temp.min,
      maxTemp: daily[0].temp.max,
      humidity: current.humidity,
      pressure: current.pressure,
      sunrise: unixEpochToTime(current.sunrise, timezone),
      sunset: unixEpochToTime(current.sunset, timezone),
      uvIndex: current.uvi,
      visibility: current.visibility,
      windSpeed: current.wind_speed,
      windDeg: current.wind_deg,
      description: current.weather[0].description,
      main: current.weather[0].main,
    });
  };

  const publishHourlyData = ({ hourly }) => {
    // pubsub.publish("hourlyDataRetrieved", hourly.slice(0, 24).map((hour) => ({
    //   temp: convertKelvinToCelsius(hour.temp),
    //   feelsLike: convertKelvinToCelsius(hour.feels_like),
    //   windSpeed: hour.wind_speed,
    //   windDeg: hour.wind_deg,
    //   main: hour.weather[0].main,
    //   description: hour.weather[0].description,
    // })));

    // console.log(hourly.slice(0, 24).map((hour) => ({
    //   temp: convertKelvinToCelsius(hour.temp),
    //   feelsLike: convertKelvinToCelsius(hour.feels_like),
    //   windSpeed: hour.wind_speed,
    //   windDeg: hour.wind_deg,
    //   main: hour.weather[0].main,
    //   description: hour.weather[0].description,
    // })));
  };

  const publishWeeklyData = ({ daily }) => {
    // pubsub.publish("weeklyDataRetrieved", (daily.slice(1).map((day) => ({
    //   temp: convertKelvinToCelsius(day.temp.day),
    //   minTemp: convertKelvinToCelsius(day.temp.min),
    //   maxTemp: convertKelvinToCelsius(day.temp.max),
    //   main: day.weather[0].main,
    //   description: day.weather[0].description,
    // }))));

    // console.log(daily.slice(1).map((day) => ({
    //   temp: convertKelvinToCelsius(day.temp.day),
    //   minTemp: convertKelvinToCelsius(day.temp.min),
    //   maxTemp: convertKelvinToCelsius(day.temp.max),
    //   main: day.weather[0].main,
    //   description: day.weather[0].description,
    // })));
  };

  const publishError = () => pubsub.publish("dataFetchError", "That city wasn't found - please try again");

  const fetchWeatherData = (cityName) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error(res.statusText);
      })
      .then((data) => fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely,alert&appid=${API_KEY}&units=metric`))
      .then((res) => {
        if (res.ok) return res.json();

        throw new Error(res.statusText);
      })
      .then((data) => {
        console.log(data);
        publishRelevantCurrentData(cityName, data);
        publishHourlyData(data);
        publishWeeklyData(data);
      })
      .catch((error) => {
        console.log(error);
        publishError();
      });
  };

  pubsub.subscribe("searchFormSubmitted", fetchWeatherData);
})();

export default weatherData;
