import pubsub from "./pubsub";

const weatherData = (() => {
  const API_KEY = "cd1c2d65c0cb1e69529587b267dbe878";

  const convertKelvinToCelsius = (temperature) => (temperature - 273.15).toFixed(1);

  const publishRelevantCurrentData = (cityName, { current, daily }) => {
    // pubsub.publish("currentDataRetrieved", {
    //   temp: convertKelvinToCelsius(current.temp),
    //   feelsLike: current.feelsLike,
    //   humidity: current.humidity,
    //   pressure: current.pressure,
    //   sunrise: current.sunrise,
    //   sunset: current.sunset,
    //   uvIndex: current.uvi,
    //   visibility: current.visibility,
    //   windSpeed: current.wind_speed,
    //   windDeg: current.wind_deg,
    //   description: current.weather[0].description,
    //   main: current.weather[0].main,
    // });

    console.log(current);

    console.log({
      cityName,
      temp: convertKelvinToCelsius(current.temp),
      feelsLike: convertKelvinToCelsius(current.feels_like),
      minTemp: convertKelvinToCelsius(daily[0].temp.min),
      maxTemp: convertKelvinToCelsius(daily[0].temp.max),
      humidity: current.humidity,
      pressure: current.pressure,
      sunrise: current.sunrise,
      sunset: current.sunset,
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

    console.log(hourly.slice(0, 24).map((hour) => ({
      temp: convertKelvinToCelsius(hour.temp),
      feelsLike: convertKelvinToCelsius(hour.feels_like),
      windSpeed: hour.wind_speed,
      windDeg: hour.wind_deg,
      main: hour.weather[0].main,
      description: hour.weather[0].description,
    })));
  };

  const publishWeeklyData = ({ daily }) => {
    // pubsub.publish("weeklyDataRetrieved", (daily.slice(1).map((day) => ({
    //   temp: convertKelvinToCelsius(day.temp.day),
    //   minTemp: convertKelvinToCelsius(day.temp.min),
    //   maxTemp: convertKelvinToCelsius(day.temp.max),
    //   main: day.weather[0].main,
    //   description: day.weather[0].description,
    // }))));

    console.log(daily.slice(1).map((day) => ({
      temp: convertKelvinToCelsius(day.temp.day),
      minTemp: convertKelvinToCelsius(day.temp.min),
      maxTemp: convertKelvinToCelsius(day.temp.max),
      main: day.weather[0].main,
      description: day.weather[0].description,
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
        publishRelevantCurrentData(cityName, data);
        publishHourlyData(data);
        publishWeeklyData(data);
      })
      .catch(() => publishError());
  };

  pubsub.subscribe("searchFormSubmitted", fetchWeatherData);
})();

export default weatherData;
