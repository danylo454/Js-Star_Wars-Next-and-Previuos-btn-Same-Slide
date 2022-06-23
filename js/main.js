const URL_PEOPLE = "https://swapi.dev/api/people";
const URL_PLANET = "https://swapi.dev/api/planets";
const URL_STARSHIPS = "https://swapi.dev/api/starships";

let btnPrevisu = window.document.querySelector(".previusBTN");
let btnNext = window.document.querySelector(".nextBTN");
let objectSelected = "people";
let Data;
window.addEventListener("load", Init);

function Init() {
  Request(URL_PEOPLE, PrintPerson);
  const people = document.querySelector(".people");
  const planets = document.querySelector(".planets");
  const starships = document.querySelector(".starships");

  people.addEventListener("click", () => {
    objectSelected = "people";
    Request(URL_PEOPLE, PrintPerson);
  });
  planets.addEventListener("click", () => {
    objectSelected = "planets";
    Request(URL_PLANET, PrintPlanets);
  });
  starships.addEventListener("click", () => {
    objectSelected = "starships";
    Request(URL_STARSHIPS, PrintStarships);
  });

  btnPrevisu.addEventListener("click", () => {
    GetSelectObjectNext();
    Request(Data.previous, GetSelectObjectNext());
  });
  btnNext.addEventListener("click", () => {
    Request(Data.next, GetSelectObjectNext());
  });
}

function GetSelectObjectNext() {
  switch (objectSelected) {
    case "people":
      return PrintPerson;
    case "planets":
      return PrintPlanets;
    case "starships":
      return PrintStarships;
  }
}

function Request(URL, CallBack) {
  fetch(URL)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.next == null) {
        btnNext.setAttribute("disabled", "true");
      } else {
        btnNext.removeAttribute("disabled", "");
      }
      if (data.previous == null) {
        btnPrevisu.setAttribute("disabled", "true");
      } else {
        btnPrevisu.removeAttribute("disabled", "");
      }
      Data = data;
      CallBack(data);
    })
    .catch((err) => console.log(err));
}
let a = 0;
PrintPerson = (data) => {
  console.log(data);
  const body = document.querySelector(".body_info");
  body.querySelectorAll("*").forEach((n) => n.remove());
  data.results.forEach((element) => {
    const root = document.querySelector(".body_info");
    const table = document.createElement("div");
    table.setAttribute("class", "name_person");

    const element_title_1 = document.createElement("h1");
    element_title_1.innerHTML = "Name: " + element.name;

    const element_title_2 = document.createElement("h2");
    element_title_2.innerHTML = "Height: " + element.height;

    const element_title_3 = document.createElement("h2");
    element_title_3.innerHTML = "Mass: " + element.mass;

    const element_title_4 = document.createElement("h2");
    element_title_4.innerHTML = "Gender: " + element.gender;

    table.appendChild(element_title_1);
    table.appendChild(element_title_2);
    table.appendChild(element_title_3);
    table.appendChild(element_title_4);
    root.appendChild(table);
  });
};
PrintPlanets = ({ results }) => {
  const body = document.querySelector(".body_info");
  body.querySelectorAll("*").forEach((n) => n.remove());
  results.forEach((element) => {
    const root = document.querySelector(".body_info");

    const table = document.createElement("div");
    table.setAttribute("class", "name_person");

    const element_title_1 = document.createElement("h1");
    element_title_1.innerHTML = "Name: " + element.name;

    const element_title_2 = document.createElement("h1");
    element_title_2.innerHTML = "Diameter: " + element.diameter;

    const element_title_3 = document.createElement("h1");
    element_title_3.innerHTML = "Climate: " + element.climate;

    table.appendChild(element_title_1);
    table.appendChild(element_title_2);
    table.appendChild(element_title_3);
    root.appendChild(table);
  });
};
PrintStarships = ({ results }) => {
  const body = document.querySelector(".body_info");
  body.querySelectorAll("*").forEach((n) => n.remove());
  results.forEach((element) => {
    const root = document.querySelector(".body_info");
    const table = document.createElement("div");
    table.setAttribute("class", "name_person");

    const element_title_1 = document.createElement("h1");
    element_title_1.innerHTML = "Name: " + element.name;

    const element_title_2 = document.createElement("h1");
    element_title_2.innerHTML = "Model: " + element.model;

    const element_title_3 = document.createElement("h1");
    element_title_3.innerHTML = "Manufacturer: " + element.manufacturer;

    const element_title_4 = document.createElement("h1");
    element_title_4.innerHTML = "Length: " + element.length;

    table.appendChild(element_title_1);
    table.appendChild(element_title_2);
    table.appendChild(element_title_3);
    table.appendChild(element_title_4);
    root.appendChild(table);
  });
};
