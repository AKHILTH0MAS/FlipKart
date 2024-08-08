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
// let filterContent = [];
let filterContent = {
  brand: [],
  priceRange: [],
  rating: [],
  ram: [],
  internalStorage: [],
};
let filteredArray = [];
let CurrentSortMarker = "relevance";
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
  updateUi(relevanceProducts);
}

function updateUi(products) {
  let id = document.getElementById(CurrentSortMarker);
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
    BrandCard.className = "categoryCard";
    brandContainer.appendChild(BrandCard);
  });

  document.querySelectorAll(".check-box").forEach((inputItem) => {
    inputItem.addEventListener("change", () => {
      if (inputItem.checked) {
        filterContent.push({ type: "brand", value: inputItem.value });
        createFilterCard();
        applyFilterOnProducts();
      } else {
        let index = filterContent.findIndex(
          (item) => item.type == "brand" && item.value == inputItem.value
        );
        filterContent.splice(index, 1);
        createFilterCard();
        applyFilterOnProducts();
      }
    });
  });
}
function clearPriceRange() {
  let selectMin = document.getElementById("SelectMin");
  let selectMax = document.getElementById("SelectMax");
  selectMin.value = 0;
  selectMax.value = 30001;
  selectMax.dispatchEvent(new Event("click"));
  selectMin.dispatchEvent(new Event("click"));
}
function createFilterCard() {
  let filterContainer = document.querySelector(".filter-content");
  filterContainer.innerHTML = "";
  filterContent.forEach((element) => {
    if (element.type == "priceRange") {
      let filterCardItem = ` 
    <div class="filtercard">
        <span class="closeButton"> ✕ </span>
        <span class="filterCardSpan">${
          element.minValue == 0 ? "Min" : `₹${element.minValue}`
        }-${
        element.maxValue == 30001 ? "₹30000+" : `₹${element.maxValue}`
      }</span>  
    </div>`;
      filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    } else {
      let filterCardItem = ` 
    <div class="filtercard">
        <span class="closeButton"> ✕ </span>
        <span class="filterCardSpan">${element.value}</span>
    </div>`;
      filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    }
  });

  let closebuttons = document.querySelectorAll(".closeButton");
  closebuttons.forEach((element) => {
    element.addEventListener("click", (event) => {
      let cardToRemove = event.target.closest(".filtercard");
      if (cardToRemove) {
        let value = cardToRemove
          .querySelector(".filterCardSpan")
          .textContent.trim();
        let index = filterContent.findIndex(
          (item) => item.type != null && item.value == value
        );

        let some = filterContent.splice(index, 1);
        if (some[0].type == "priceRange") {
          clearPriceRange();
        }
        cardToRemove.remove();
        let correspondingCheckbox = document.getElementById(value);
        if (correspondingCheckbox) {
          correspondingCheckbox.checked = false;
        }

        applyFilterOnProducts();
      }
    });
  });
}

function applyFilterOnProducts() {
  // if (filterContent.length != 0) {
  //   filteredArray = [];
  //   filterContent.forEach((element1) => {
  //     if (element1.type == "brand") {
  //       let arr = products.filter((value) => {
  //         if (value.brand == element1.value) return value;
  //       });
  //       filteredArray = filteredArray.concat(arr);
  //     } else if (element1.type == "priceRange") {
  //       if (filteredArray.length == 0) {
  //         let arr = products.filter((value) => {
  //           if (element1.maxValue == 30001) {
  //             element1.maxValue = Infinity;
  //           }
  //           if (
  //             value.price > element1.minValue &&
  //             value.price < element1.maxValue
  //           ) {
  //             return value;
  //           }
  //         });
  //         filteredArray = filteredArray.concat(arr);
  //       } else {
  //         filteredArray = filteredArray.filter((value) => {
  //           if (element1.maxValue == 30001) {
  //             element1.maxValue = Infinity;
  //           }
  //           if (
  //             value.price > element1.minValue &&
  //             value.price < element1.maxValue
  //           ) {
  //             return value;
  //           }
  //         });
  //       }
  //     }
  //   });
  // } else {
  //   filteredArray = products.sort((a, b) => 0.5 - Math.random());
  // }
  // clearUI();
  // console.log(filteredArray);
  // updateUi(filteredArray);
  
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
  updateUi(relevanceProducts);
});

document.getElementById("Popularity").addEventListener("click", () => {
  sortByColorReset();
  sortPopularityOrder(products);
  clearUI();
  CurrentSortMarker = "Popularity";
  updateUi(products);
});

document.getElementById("PriceLow").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingOrder(products);
  clearUI();
  CurrentSortMarker = "PriceLow";
  updateUi(products);
});

document.getElementById("PriceHigh").addEventListener("click", () => {
  sortByColorReset();
  sortDescendingOrder(products);
  clearUI();
  CurrentSortMarker = "PriceHigh";
  updateUi(products);
});
document.getElementById("SelectMin").addEventListener("click", () => {
  let selectMin = document.getElementById("SelectMin");
  let SelectMax = document.getElementById("SelectMax");
  let SelectMaxValue = parseInt(document.getElementById("SelectMax").value);
  let SelectMinValue = parseInt(selectMin.value);
  let options = [10000, 15000, 20000, 30000, 30001];
  let text = [];
  options.forEach((element) => {
    if (element > SelectMinValue) {
      if (element == SelectMaxValue) {
        text.push(
          `<option value="${element}" selected>${
            element == 30001 ? "₹30000+" : `₹${element}`
          }</option>`
        );
      } else {
        text.push(
          `<option value="${element}" >${
            element == 30001 ? "₹30000+" : `₹${element}`
          }</option>`
        );
      }
    }
  });
  SelectMax.innerHTML = text.join("");
});
document.getElementById("SelectMin").addEventListener("change", () => {
  let selectMin = document.getElementById("SelectMin");
  let SelectMax = document.getElementById("SelectMax");
  let SelectMaxValue = parseInt(document.getElementById("SelectMax").value);
  let SelectMinValue = parseInt(selectMin.value);
  let options = [10000, 15000, 20000, 30000, 30001];
  let text = [];
  options.forEach((element) => {
    if (element > SelectMinValue) {
      if (element == SelectMaxValue) {
        text.push(
          `<option value="${element}" selected>${
            element == 30001 ? "₹30000+" : `₹${element}`
          }</option>`
        );
      } else {
        text.push(
          `<option value="${element}" >${
            element == 30001 ? "₹30000+" : `₹${element}`
          }</option>`
        );
      }
    }
  });
  SelectMax.innerHTML = text.join("");
  let index = filterContent.findIndex((value) => value.type == "priceRange");
  if (index == -1) {
    filterContent.push({
      type: "priceRange",
      minValue: SelectMinValue,
      maxValue: SelectMaxValue,
    });
  } else {
    filterContent.splice(index, 1, {
      type: "priceRange",
      minValue: SelectMinValue,
      maxValue: SelectMaxValue,
    });
  }
  createFilterCard();
  applyFilterOnProducts();
});
document.getElementById("SelectMax").addEventListener("click", () => {
  let text = [];
  let SelectMaxValue = parseInt(document.getElementById("SelectMax").value);
  let SelectMin = document.getElementById("SelectMin");
  let SelectMinValue = parseInt(document.getElementById("SelectMin").value);
  let options = [0, 10000, 15000, 20000, 30000, 30001];
  options.forEach((element) => {
    if (element < SelectMaxValue) {
      if (element == SelectMinValue) {
        if (element == 0) {
          text.push(`<option value="${element}">Min</option>`);
        } else {
          text.push(
            `<option value="${element}" selected>${
              element == 30001 ? "₹30000+" : `₹${element}`
            }</option>`
          );
        }
      } else {
        if (element == 0) {
          text.push(`<option value="${element}">Min</option>`);
        } else {
          text.push(
            `<option value="${element}">${
              element == 30001 ? "₹30000+" : `₹${element}`
            }</option>`
          );
        }
      }
    }
  });
  SelectMin.innerHTML = text.join("");
});
document.getElementById("SelectMax").addEventListener("change", () => {
  let text = [];
  let SelectMaxValue = parseInt(document.getElementById("SelectMax").value);
  let SelectMin = document.getElementById("SelectMin");
  let SelectMinValue = parseInt(document.getElementById("SelectMin").value);
  let options = [0, 10000, 15000, 20000, 30000, 30001];
  options.forEach((element) => {
    if (element < SelectMaxValue) {
      if (element == SelectMinValue) {
        if (element == 0) {
          text.push(`<option value="${element}">Min</option>`);
        } else {
          text.push(
            `<option value="${element}" selected>${
              element == 30001 ? "₹30000+" : `₹${element}`
            }</option>`
          );
        }
      } else {
        if (element == 0) {
          text.push(`<option value="${element}">Min</option>`);
          console.log(element);
        } else {
          text.push(
            `<option value="${element}">${
              element == 30001 ? "₹30000+" : `₹${element}`
            }</option>`
          );
        }
      }
    }
  });
  SelectMin.innerHTML = text.join("");
  let index = filterContent.findIndex((value) => value.type == "priceRange");
  if (index == -1) {
    filterContent.push({
      type: "priceRange",
      minValue: SelectMinValue,
      maxValue: SelectMaxValue,
    });
  } else {
    filterContent.splice(index, 1, {
      type: "priceRange",
      minValue: SelectMinValue,
      maxValue: SelectMaxValue,
    });
  }
  createFilterCard();
  applyFilterOnProducts();
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
