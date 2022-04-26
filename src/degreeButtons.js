import pubsub from "./pubsub";

const degreeButtons = (() => {
  const degreeButtonsContainer = (() => {
    const container = document.createElement("div");
    container.classList.add("degree-btn-container");

    container.innerHTML = `
      <button id="celsius" class="degree-btn active">˚C</button>
      <div class="divider"></div>
      <button id="fahrenheit" class="degree-btn">˚F</button>
    `;

    return container;
  })();

  const initiateDegreeChange = (ev) => {
    if (ev.target.classList.contains("active")) return;

    degreeButtonsContainer.querySelector(".active").classList.remove("active");
    ev.target.classList.add("active");

    pubsub.publish("degreeChange", ev.target.id);
  };

  degreeButtonsContainer.querySelectorAll(".degree-btn").forEach((btn) => {
    btn.addEventListener("click", initiateDegreeChange);
  });

  return {
    render() {
      document.body.appendChild(degreeButtonsContainer);
    },
  };
})();

export default degreeButtons;
