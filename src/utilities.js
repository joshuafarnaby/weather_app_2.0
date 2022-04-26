export const kelvinToCelsius = (kelvinTemp) => (kelvinTemp - 273.15).toFixed(1);
export const kelvinToFahrenheit = (kelvinTemp) => ((kelvinTemp - 273.15) * (9 / 5) + 32).toFixed(1);
export const celsiusToFahrenheit = (celsiusTemp) => ((celsiusTemp * (9 / 5)) + 32).toFixed(1);
export const fahrenheitToCelsius = (fahrenheitTemp) => ((fahrenheitTemp - 32) * (5 / 9)).toFixed(1);
