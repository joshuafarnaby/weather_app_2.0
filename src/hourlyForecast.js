import pubsub from "./pubsub";
import rightIcon from "./assets/icons/right.svg";
import leftIcon from "./assets/icons/left.svg";

const hourlyForecast = (() => {
  document.getElementById("right-btn-icon").src = rightIcon;
  document.getElementById("left-btn-icon").src = leftIcon;
})();

export default hourlyForecast;
