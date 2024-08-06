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
  sortPopularityOrder,
} from "./scripts/sortFunctions.js";

let products = [];
let header;
let relevanceProducts = [];
let   filterContent = [];
let filteredArray = [];

function sortByColorReset() {
  let sortItemClass = document.querySelectorAll(".sort-nav-item");
  sortItemClass.forEach((element) => {
    element.style.color = "#000";
  });
}

async function main(data) {
  relevanceProducts = [...products];
  navBar(data.nav);
  secondaryNavBar(data.secondaryNav);
  mobileContainerHeader(data, products);
  updateUi("relevance", relevanceProducts);
}

function updateUi(param, products) {
  let id = document.getElementById(param);
  id.style.color = "#2874f0";
  products.forEach((element) => {
    mobileCard(element);
  });
}
function addBrandsOnCategory() {
  let brandContainer = document.querySelector(".brandsListing");
  let brand = [];
  products.forEach((element) => {
    brand.push(element.brand);
  });

  let uniqueBrands = [...new Set(brand)];

  uniqueBrands.forEach((element) => {
    let BrandCard = document.createElement("div");
    BrandCard.innerHTML = `<input class="check-box" type="checkbox" value="${element}" id="${element}"><span>  ${element}</span>`;
    BrandCard.className = "BrandCard";
    brandContainer.appendChild(BrandCard);
  });

  document.querySelectorAll(".check-box").forEach((inputItem) => {
    inputItem.addEventListener("change", () => {
      if (inputItem.checked) {
        filterContent.push({ type: "brand", value: inputItem.value });
        filterCard();
        filterProducts();
      } else {
        filterContent.splice(
          filterContent.indexOf({ type: "brand", value: inputItem.value }),
          1
        );
        filterCard();
        filterProducts(); 
      }
    });
  });
}
function filterCard() {
  let filterContainer = document.querySelector(".filter-content");
  filterContainer.innerHTML = "";
  filterContent.forEach((element) => {
    let filterCardItem = ` 
    <div class="filtercard">
        <span class="closeButton"> ✕ </span>
        <span class="filterCardSpan">${element.value}</span>
    </div>`;
    filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
  });

  let closebuttons = document.querySelectorAll(".closeButton");
  closebuttons.forEach((element) => {
    element.addEventListener("click", (event) => {
      let cardToRemove = event.target.closest(".filtercard");
      if (cardToRemove) {
        let value = cardToRemove
          .querySelector(".filterCardSpan")
          .textContent.trim();
        filterContent.splice(filterContent.indexOf(value), 1);
        cardToRemove.remove();
        let correspondingCheckbox = document.getElementById(value);
        if (correspondingCheckbox) {
          correspondingCheckbox.checked = false;
        }
        filterProducts();
      }
    });
  });
}
function filterProducts() {
  if (filterContent.length != 0) {
    filteredArray = [];
    filterContent.forEach((element1) => {
      if (element1.type == "brand") {
        products.forEach((element2) => {
          if (element2.brand == element1.value) {
            filteredArray.push(element2);
          }
        });
      }
    });
  } else {
    filteredArray = [...relevanceProducts];
  }
  clearUI();
  updateUi("relevance", filteredArray);
}

function filterClear() {
  filterContent = [];
  let filterContainer = document.querySelector(".filter-content");
  filterContainer.innerHTML = "";
}
function clearUI() {
  let mobilesContainer = document.querySelector(".mobilesContainerWrapper");
  mobilesContainer.innerHTML = "";
}
document.getElementById("relevance").addEventListener("click", () => {
  sortByColorReset();
  clearUI();
  updateUi("relevance", relevanceProducts);
});

document.getElementById("Popularity").addEventListener("click", () => {
  sortByColorReset();
  sortPopularityOrder(products);
  clearUI();
  updateUi("Popularity", products);
});

document.getElementById("PriceLow").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingOrder(products);
  clearUI();
  updateUi("PriceLow", products);
});

document.getElementById("PriceHigh").addEventListener("click", () => {
  sortByColorReset();
  sortDescendingOrder(products);
  clearUI();
  updateUi("PriceHigh", products);
});

fetchData()
  .then((data) => {
    header = data.header;
    products = data.products;
    main(header);
    addBrandsOnCategory();
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });


  