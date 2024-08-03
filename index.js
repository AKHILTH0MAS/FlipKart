import { fetchData } from "./scripts/fetchdata.js";
import {
  navBar,
  secondaryNavBar,
  mobileContainerHeader,
  mobileCard,
} from "./scripts/uiFunctions.js";
import {
  sortAscendingOrder,
  sortDescendingOrder,
} from "./scripts/sortFunctions.js";

let products = [];
let header;

function sortByColorReset() {
  let sortItemClass = document.querySelectorAll(".sort-nav-item");
  sortItemClass.forEach((element) => {
    console.log("reseting color");
    console.log(element);

    element.style.color = "#000";
  });
}

async function main(data) {
  navBar(data.nav);
  secondaryNavBar(data.secondaryNav);
  mobileContainerHeader(data, products);
  updateUi("relevance");
}

function updateUi(param) {
  let id = document.getElementById(param);
  id.style.color = "#2874f0";
  products.forEach((element) => {
    mobileCard(element);
  });
}

function clearUI() {
  let mobilesContainer = document.querySelector(".mobilesContainerWrapper");
  mobilesContainer.innerHTML = "";
}

document.getElementById("PriceLow").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingOrder(products);
  clearUI();
  updateUi("PriceLow");
});

document.getElementById("PriceHigh").addEventListener("click", () => {
  sortByColorReset();
  sortDescendingOrder(products);
  clearUI();
  updateUi("PriceHigh");
});

fetchData()
  .then((data) => {
    header = data.header;
    products = data.products;
    main(header);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });



