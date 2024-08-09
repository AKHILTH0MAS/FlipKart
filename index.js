import { fetchData } from "./scripts/fetchdata.js";
import {
  navBar,
  secondaryNavBar,
  mobileContainerHeader,
  mobileCard,
  clearPriceRange,
  updateUi,
  applyFilterOnProducts,
  clearUI,
} from "./scripts/uiFunctions.js";
import {
  sortAscendingOrder,
  sortDescendingOrder,
  sortPopularityOrder,
  sortPopularityDescendingOrder,
  sortRelevanceOrder,
  sortAscendingDateOrder,
} from "./scripts/sortFunctions.js";

let products = [];
let header;
let relevanceProducts = [];
let filterContent = {
  brand: new Set(),
  priceRange: { min: null, max: null },
  rating: new Set(),
  ram: new Set(),
  internalStorage: new Set(),
};
let filteredArray = [];
let CurrentSortMarker = "relevance";
// changing the color of the top teranery nav bar showing the sortby after another one is selected
function sortByColorReset() {
  let sortItemClass = document.querySelectorAll(".sort-nav-item");
  sortItemClass.forEach((element) => {
    element.style.color = "#000";
  });
}
// lol main function
async function main(data) {
  filteredArray = [...products];
  navBar(data.nav);
  secondaryNavBar(data.secondaryNav);
  mobileContainerHeader(data, products);
  updateUi(filteredArray, CurrentSortMarker);
  addBrandsOnCategory(products);
}
// adding brands on the side bar
function addBrandsOnCategory(products) {
  let brandContainer = document.querySelector(".brandsListing");
  let brand = [];
  products.forEach((element) => {
    brand.push(element.brand);
  });

  let uniqueBrands = [...new Set(brand)];

  uniqueBrands.forEach((element) => {
    let BrandCard = document.createElement("div");
    BrandCard.innerHTML = `<input class="check-box brand" type="checkbox" value="${element}" id="${element}"><span>  ${element}</span>`;
    BrandCard.className = "categoryCard";
    brandContainer.appendChild(BrandCard);
  });

  document.querySelectorAll(".check-box").forEach((inputItem) => {
    inputItem.addEventListener("change", () => {
      if (inputItem.checked) {
        filterContent.brand.add(inputItem.value);
        createFilterCard(inputItem.className, filterContent);
        filteredArray = applyFilterOnProducts(
          filterContent,
          filteredArray,
          products,
          CurrentSortMarker
        );
        clearUI();
        updateUi(filteredArray, CurrentSortMarker);
      } else {
        filterContent.brand.delete(inputItem.value);
        createFilterCard(inputItem.className, filterContent);
        filteredArray = applyFilterOnProducts(
          filterContent,
          filteredArray,
          products,
          CurrentSortMarker
        );
        clearUI();
        updateUi(filteredArray, CurrentSortMarker);
      }
    });
  });
}

// rating based filtering rating 4 star and above
document.getElementById("4").addEventListener("change", () => {
  let input = document.getElementById("4");
  if (input.checked) {
    filterContent.rating.add(4);
    createFilterCard("inputcheck rating");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.rating.delete(4);
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  }
});

// for selecting only on the three stared or above the
document.getElementById("3").addEventListener("change", () => {
  let input = document.getElementById("3");
  if (input.checked) {
    filterContent.rating.add(3);
    createFilterCard("inputcheck rating");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.rating.delete(3);
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  }
});
//event listner for the relevance

document.getElementById("relevance").addEventListener("click", () => {
  CurrentSortMarker = "relevance";
  sortRelevanceOrder(filteredArray);
  sortByColorReset();
  clearUI();
  updateUi(filteredArray, CurrentSortMarker);
});
//event listner for the Popularity

document.getElementById("Popularity").addEventListener("click", () => {
  sortByColorReset();
  sortPopularityOrder(filteredArray);
  clearUI();
  CurrentSortMarker = "Popularity";
  updateUi(filteredArray, CurrentSortMarker);
});
//event listner for the Price to low to high
document.getElementById("PriceLow").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingOrder(filteredArray);
  clearUI();
  CurrentSortMarker = "PriceLow";
  updateUi(filteredArray, CurrentSortMarker);
});
//eventListner for the newest first
document.getElementById("NewestFirst").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingDateOrder(filteredArray);
  console.log(filteredArray);
  CurrentSortMarker = "NewestFirst";
  clearUI();
  updateUi(filteredArray, CurrentSortMarker);
});
//event listner for the price high to low
document.getElementById("PriceHigh").addEventListener("click", () => {
  sortByColorReset();
  sortDescendingOrder(filteredArray);
  clearUI();
  CurrentSortMarker = "PriceHigh";
  updateUi(filteredArray, CurrentSortMarker);
});
//resting the select tags
document.getElementById("SelectMin").addEventListener("click", () => {
  // for resetting the select tags
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
// for resting the select tags action

document.getElementById("SelectMax").addEventListener("click", () => {
  // for resting the select tags action
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
//create filter card showing on the top of the filters heading
function createFilterCard(classNameList) {
  let filterContainer = document.querySelector(".filter-content");
  filterContainer.innerHTML = "";
  let className = classNameList.split(" ")[1];

  if (className == "brand") {
    filterContent.brand.forEach((element) => {
      let filterCardItem = ` 
      <div class="filtercard">
        <span class="closeButtonBrand"> ✕ </span>
        <span class="${className}">${element}</span>
      </div>`;
      filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    });
  } else if (className == "priceRange") {
    let filterCardItem = `
      <div class="filtercard">
        <span class="closeButtonpriceRange"> ✕ </span>
        <span class="${className}">${
      filterContent.priceRange.min == 0
        ? "Min"
        : `₹${filterContent.priceRange.min}`
    }-${
      filterContent.priceRange.max == Infinity
        ? "₹30000+"
        : `₹${filterContent.priceRange.max}`
    }</span>
      </div>`;
    filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    document
      .querySelector(".closeButtonpriceRange")
      .addEventListener("click", (e) => {
        let cardToRemove = e.target.closest(".filtercard");
        if (cardToRemove) {
          filterContent.priceRange = {
            min: null,
            max: null,
          };
          cardToRemove.remove();
          clearPriceRange();
          filteredArray = applyFilterOnProducts(
            filterContent,
            filteredArray,
            products,
            CurrentSortMarker
          );
          clearUI();
          updateUi(filteredArray, CurrentSortMarker);
        }
      });
  } else if (className == "rating") {
    filterContent.rating.forEach((value) => {
      let item;
      if (value == "4") {
        item = "4★ & above";
      } else {
        item = "3★ & above";
      }
      let filterCardItem = ` 
      <div class="filtercard">
        <span class="closeButtonRating"> ✕ </span>
        <span class="${className}">${item}</span>
      </div>`;
      filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    });
  }
  let closebuttonBrands = document.querySelectorAll(".closeButtonBrand");
  closebuttonBrands.forEach((element) => {
    element.addEventListener("click", (event) => {
      let cardToRemove = event.target.closest(".filtercard");
      if (cardToRemove) {
        let value = cardToRemove.querySelector(".brand").textContent.trim();
        filterContent.brand.delete(value);
        cardToRemove.remove();
        let correspondingCheckbox = document.getElementById(value);
        if (correspondingCheckbox) {
          correspondingCheckbox.checked = false;
        }
        filteredArray = applyFilterOnProducts(
          filterContent,
          filteredArray,
          products,
          CurrentSortMarker
        );
        clearUI();
        updateUi(filteredArray, CurrentSortMarker);
      }
    });
  });
  let closeButtonRating = document.querySelectorAll(".closeButtonRating");
  closeButtonRating.forEach((element) => {
    element.addEventListener("click", (event) => {
      let cardToRemove = event.target.closest(".filtercard");
      if (cardToRemove) {
        let value = parseInt(
          cardToRemove.querySelector(".rating").textContent.trim().split("")[0]
        );

        filterContent.rating.delete(value);
        console.log(typeof value);
        cardToRemove.remove();
        let correspondingCheckbox = document.getElementById(value);
        if (correspondingCheckbox) {
          correspondingCheckbox.checked = false;
        }
        filteredArray = applyFilterOnProducts(
          filterContent,
          filteredArray,
          products,
          CurrentSortMarker
        );
        clearUI();          
        updateUi(filteredArray, CurrentSortMarker);
      }
    });
  });
}
// evcent listner for  the select tags action
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
  if (SelectMaxValue == 30001) {
    SelectMaxValue = Infinity;
  }
  filterContent.priceRange = {
    max: SelectMaxValue,
    min: SelectMinValue,
  };

  createFilterCard("SelectItem priceRange", filterContent);
  filteredArray = applyFilterOnProducts(
    filterContent,
    filteredArray,
    products,
    CurrentSortMarker
  );
  clearUI();
  updateUi(filteredArray, CurrentSortMarker);
});
// evcent listner for  the select tags action
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
  if (SelectMaxValue == 30001) {
    SelectMaxValue = Infinity;
  }
  filterContent.priceRange = {
    max: SelectMaxValue,
    min: SelectMinValue,
  };

  createFilterCard("SelectItem priceRange", filterContent);
  filteredArray = applyFilterOnProducts(
    filterContent,
    filteredArray,
    products,
    CurrentSortMarker
  );
  clearUI();
  updateUi(filteredArray, CurrentSortMarker);
});
// event listner for ram 4 gb
document.getElementById("4gbram").addEventListener("change", () => {});
fetchData()
  .then((data) => {
    header = data.header;
    products = data.products;
    main(header);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
