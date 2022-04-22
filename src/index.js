import "./stylesheets/style.css";

import pubsub from "./pubsub";
import weatherData from "./weatherData";

const city = "london";
// const city = "sjxidc";

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
//   .then((res) => {
//     if (res.ok) return res.json();

//     throw new Error(`${res.status}`);
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// navigator.geolocation.getCurrentPosition((pos) => {
//   const lat = pos.coords.latitude.toFixed(2);
//   const lon = pos.coords.longitude.toFixed(2);

//   console.log(pos);

//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// });
