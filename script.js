const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const regionFilters = filterBtn.querySelectorAll("li");
const searchEl = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

const countries_API = "https://restcountries.eu/rest/v2/all";

getCountries();

async function getCountries() {
  const res = await fetch(countries_API);
  const countriesData = await res.json();
  console.log(countriesData);

  displayCountries(countriesData);
}

function displayCountries(countries) {
  countriesEl.innerHTML = "";

  countries.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("card");

    countryEl.innerHTML = `
        <div class="card__card-header">
            <img src="${country.flag}" alt="${country.name}" />
        </div>
        <div class="card__card-body">
          <h2 class="country-name">${country.name}</h2>
          <p>
            <strong>Population: </strong>
            ${country.population}
          </p>
          <p class="country-region">
            <strong>Region: </strong> 
            ${country.region}
          </p>
          <p>
            <strong>Capital: </strong>
            ${country.capital}
          </p>
        </div>
     
      `;

    countryEl.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });
    countriesEl.appendChild(countryEl);
  });
}

function showCountryDetails(country) {
  const modalBody = modal.querySelector(".modal-body");
  const modalImg = modal.querySelector("img");

  modalImg.src = country.flag;

  modalBody.innerHTML = `
  <h2 class="country-name">${country.name}</h2>
  <p>
    <strong>Population: </strong>
    ${country.population}
  </p>
  <p>
    <strong>Native Name: </strong>
    ${country.nativeName}
  </p>
  <p class="country-region">
    <strong>Region: </strong> 
    ${country.region}
  </p>
  <p class="country-region">
    <strong>Sub Region: </strong> 
    ${country.subregion}
  </p>
  <p>
    <strong>Capital: </strong>
    ${country.capital}
  </p>
  <p>
    <strong>Top Level Domain: </strong>
    ${country.topLevelDomain[0]}
  </p>
  <p>
    <strong>Currencies: </strong>
    ${country.currencies.map((currency) => currency.code)}
  </p>
  <p>
    <strong>Languages: </strong>
    ${country.languages.map((language) => language.name)}
  </p>
  `;
}

// Event Listeners
toggleBtn.addEventListener("click", changeTheme);
filterBtn.addEventListener("click", selectRegion);
searchEl.addEventListener("input", inputSearch);
closeBtn.addEventListener("click", closeModal);

function changeTheme() {
  document.body.classList.toggle("dark");
}

function selectRegion() {
  filterBtn.classList.toggle("open");
}

function inputSearch(e) {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");

  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
}

regionFilters.forEach((filters) => {
  filters.addEventListener("click", () => {
    const value = filters.innerText;
    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach((region) => {
      if (region.innerText.includes(value) || value === "All") {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

function closeModal() {
  modal.style.display = "none";
}
