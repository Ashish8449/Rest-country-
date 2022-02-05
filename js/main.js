/*================================================================================
                             variabels                                                   
================================================================================*/
const cardBox = document.querySelector(".cardBox");
// let country;
const loderMain = document.querySelector(".loderMain");

const form = document.querySelector("form")[0];
const input = document.querySelector("input");

const main_page = document.querySelector(".main_page");
const container = document.querySelector(".container");
const DarkMode = document.querySelector(".DarkMode");
let flg = 0;
const select = document.querySelector("select");
const loderMaintop = document.querySelector(".loderMaintop");
console.log(select);

/*================================================================================
                             funtions                                                   
================================================================================*/
const manipulateData = function (data) {
  const arr = data.map((item) => {
    const obj = {
      flag: item.flags.svg,
      country: item.name.common,
      population: item.population,
      region: item.region,
      capital: item.capital,
    };
    return obj;
  });
  country = arr;
  //   console.log(arr);
  return arr;
};
const card = function (obj) {
  // loderMaintop.style.display = "none";
  return `
    <div class="card">
    <a href="#${obj.country}">
      <img
        src="${obj.flag}"
        alt=""
        class="cardImg"
      />
      <div class="card-data">
        <h4>${obj.country}</h4>
        <ul>
          <li>Population:<span>${obj.population}</span></li>
          <li>Region:<span>${obj.region}</span></li>
          <li>Capital:<span>${obj.capital}</span></li>
        </ul>
      </div>
      </a>
    </div>
 `;
};
const counteryRender = function (obj) {
  console.log(obj);
  console.log(obj.currencies.slice(0, 3).map((item) => item.currency));
  const currencies = obj.currencies.slice(0, 3);

  console.log(currencies);
  return `     <div class="countryrender">
  <a href="#Home">
    <button><i class="fas fa-arrow-left"></i> Back</button></a
  >
  <div class="row wrapper">
    <div class="col6">
      <img src="${obj.flag}" alt="" />
    </div>
    <div class="col6">
      <h2>${obj.name}</h2>
      <div class="countryInfo row">
        <ul>
          <li>Native Name: <span>${obj.nativeName}</span></li>
          <li>Population: <span>${obj.population}</span></li>
          <li>Region: <span>${obj.region}</span></li>
          <li>Sub Region: <span>${obj.subregion}</span></li>
          <li>Capital: <span>${obj.capital}</span></li>
        </ul>
        <ul>
          <li>Top Level Domain: <span>${obj.topLevelDomain[0]}</span></li>
          <li>Currencies: <span>${obj.currencies[0].code}</span></li>
          <li>Language: <span>${obj.languages[0].name}</span></li>
        </ul>
      </div>
      <div class="borderCountries">
        Border countries :
    
       
      </div>
    </div>
  </div>
</div>`;
};

/*=============================================================================
                             click on country                                                  
=============================================================================*/

const getCountryData = async function (newCountry) {
  const res = await fetch(`https://restcountries.com/v2/name/${newCountry}`);
  const data = await res.json();
  console.log(data);
  console.log(data[0].borders);
  let borderCountries = data[0].borders;

  console.log(borderCountries);
  container.innerHTML = counteryRender(...data);
  const parent = document.querySelector(".borderCountries");
  console.log(parent);
  borderCountries.forEach((ele) => {
    console.log(ele);
    fetchByBorder(ele).then((dt) => {
      console.log(dt);
      const tag = document.createElement("a");
      tag.setAttribute("href", `#${dt[0].name.common}`);
      tag.innerHTML = `<button>${dt[0].name.common}</button>`;
      parent.append(tag);
    });
  });
};
/*=============================================================================
                             input function                                                  
=============================================================================*/

const inputCountry = function (e) {
  loderMain.style.display = "block";
  cardBox.innerHTML = "";
  e.preventDefault();
  console.log(e.target.value);
  if (!e.value) {
    selectFunc(e, select.value);
  }
  const string = new RegExp(e.target.value, "gi");

  const newData = country.filter((country) => {
    return (
      country.country.match(string) !== null &&
      (country.region === select.value || select.value === "All")
    );
  });
  if (!newData.length) {
    alert("Opps ! No Country Found!");
  }
  setTimeout(() => {
    loderMain.style.display = "none";
    cardBox.innerHTML = newData.map((item) => card(item)).join("");
  }, 1000);
};
/*=============================================================================
                             get all countries                                                  
=============================================================================*/

const getAllCountries = async function () {
  try {
    loderMain.style.display = "block";
    cardBox.style.display = "none";
    const res = await fetch("https://restcountries.com/v3.1/all");

    const data = await await res.json();
    if (!res.ok) throw new Error("Couldn't get all countries'");
    const newData = manipulateData(data);
    setTimeout(() => {
      loderMain.style.display = "none";
      cardBox.style.display = "flex";
      cardBox.innerHTML = newData.map((item) => card(item)).join("");
    }, 1000);
  } catch (error) {
    alert(error.message);
  }
};
/*=============================================================================
                             hashChange                                                  
=============================================================================*/
const hashChangeFunc = function (e) {
  main_page.classList.add("hidden");

  console.log(container);
  console.log(e);
  const newCountry = e.newURL.slice(e.newURL.lastIndexOf("#") + 1);
  if (newCountry == "Home") {
    console.log("home");
    // input.value="";
    const countryRender = container.querySelector(".countryrender");
    countryRender.remove();
    main_page.classList.remove("hidden");
    container.append(main_page);
    selectFunc(e, select.value);
    
    return;
  }
  getCountryData(newCountry);
};

async function fetchByBorder(name) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Oops! This country doesn't exist");
    }
    if (res.ok) {
      return data;
    }
  } catch (err) {
    window.alert(err.message);
  }
}
/*=============================================================================
                             Dark mode                                                  
=============================================================================*/

const DarkModeFunc = function (e) {
  const root = document.querySelector(":root");
  console.log(root);
  if (flg) {
    root.style.setProperty("--Elements", "hsl(0, 0%, 100%)");
    root.style.setProperty("--Text", "hsl(200, 15%, 8%)");
    root.style.setProperty("--Background", "hsl(0, 0%, 98%)");
    root.style.setProperty("--Input", "hsl(0, 0%, 52%)");
  } else {
    // dark
    root.style.setProperty("--Elements", "hsl(209, 23%, 22%)");
    root.style.setProperty("--Text", "hsl(0, 0%, 100%)");
    root.style.setProperty("--Background", "hsl(207, 26%, 17%)");
    root.style.setProperty("--Input", "#fff");
  }
  flg = !flg;
};
/*=============================================================================
                             filter function                                                  
=============================================================================*/

const selectFunc = function (e, string) {
  const region = string || e.target.value;
  let newData = country;
  const inputValue = new RegExp(input.value, "gi");

  newData = newData.filter((item) => {
    return (
      (item.region == region || region == "All") &&
      (item.country.match(inputValue) || !inputValue)
    );
  });
  if (!newData.length) {
    console.log("noe ");
    alert("Opps ! No Country Found!");
  }

  loderMain.style.display = "block";
  cardBox.style.display = "none";
  setTimeout(() => {
    loderMain.style.display = "none";
    cardBox.style.display = "flex";
    cardBox.innerHTML = newData.map((item) => card(item)).join("");
  }, 1000);
};

/*================================================================================
                             addevent listner                                                   
================================================================================*/
console.log(form);
window.addEventListener("load", getAllCountries);
input.addEventListener("input", inputCountry);

window.addEventListener("hashchange", hashChangeFunc);
DarkMode.addEventListener("click", DarkModeFunc);
select.addEventListener("change", selectFunc);
