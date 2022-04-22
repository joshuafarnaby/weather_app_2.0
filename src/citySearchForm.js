import pubsub from "./pubsub";
import searchIcon from "./assets/icons/magnify.svg";

const searchCityForm = (() => {
  const searchForm = (() => {
    const form = document.createElement("form");
    form.id = "search-city-form";
    form.classList.add("city-form");

    form.innerHTML = `
      <label for="search-city-input">SEARCH CITY:</label>
      <input type="text" id="search-city-input" name="city" class="form-input">
      <span id="error-msg" class="form-error"></span>
      <button class="submit-btn"><img src="${searchIcon}" alt="search icon"></button>
    `;

    return form;
  })();

  // const publishSearchValue = (ev) => {
  //   ev.preventDefault();
  //   const searchValue = ev.target.querySelector("#search-city-input").value;
  // };

  const render = () => document.body.appendChild(searchForm);

  // searchForm.addEventListener("submit", publishSearchValue);

  return {
    render,
  };
})();

export default searchCityForm;
