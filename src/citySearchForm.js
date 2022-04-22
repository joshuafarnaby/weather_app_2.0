import pubsub from "./pubsub";
import searchIcon from "./assets/icons/magnify.svg";

const searchCityForm = (() => {
  const searchForm = (() => {
    const form = document.createElement("form");
    form.id = "search-city-form";
    form.classList.add("city-form");

    form.innerHTML = `
      <label for="search-city-input">SEARCH CITY:</label>
      <input type="text" id="search-city-input" name="city" class="form-input" placeholder="New York">
      <span id="error-msg" class="form-error"></span>
      <button class="submit-btn"><img src="${searchIcon}" alt="search icon"></button>
    `;

    return form;
  })();

  const hideFormError = () => searchForm.querySelector("#error-msg").classList.remove("visible");

  const displayFormError = (message) => {
    searchForm.querySelector("#error-msg").classList.add("visible");
    searchForm.querySelector("#error-msg").innerText = message;

    setTimeout(hideFormError, 2000);
  };

  const publishSearchValue = (ev) => {
    ev.preventDefault();

    const searchValue = ev.target.querySelector("#search-city-input").value;
    ev.target.reset();

    if (searchValue === "") {
      displayFormError("Please enter a valid search term");
      return;
    }

    pubsub.publish("searchFormSubmitted", searchValue);
  };

  const render = () => document.body.appendChild(searchForm);

  searchForm.addEventListener("submit", publishSearchValue);

  pubsub.subscribe("dataFetchError", displayFormError);

  return {
    render,
  };
})();

export default searchCityForm;
