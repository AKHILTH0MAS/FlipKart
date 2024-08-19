import { fetchData } from "./scripts/fetchdata.js";
import {
  navBar,
  secondaryNavBar,
  mobileContainerHeader,
  clearPriceRange,
  updateUi,
  applyFilterOnProducts,
  clearUI,
} from "./scripts/uiFunctions.js";
import {
  sortAscendingOrder,
  sortDescendingOrder,
  sortPopularityOrder,
  sortRelevanceOrder,
  sortAscendingDateOrder,
} from "./scripts/sortFunctions.js";

let products = [];
let header;
let page = 1;
let filterContent = {
  brand: new Set(),
  priceRange: { min: null, max: null },
  rating: new Set(),
  ram: new Set(),
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
  Pagination();
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
        Pagination();
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
        Pagination();
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
    Pagination();
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
    Pagination();
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
    Pagination();
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
    Pagination();
  }
});
//event listner for the relevance
document.getElementById("relevance").addEventListener("click", () => {
  CurrentSortMarker = "relevance";
  sortRelevanceOrder(filteredArray);
  sortByColorReset();
  clearUI();
  updateUi(filteredArray, CurrentSortMarker);
  Pagination();
});
//event listner for the Popularity
document.getElementById("Popularity").addEventListener("click", () => {
  sortByColorReset();
  sortPopularityOrder(filteredArray);
  clearUI();
  CurrentSortMarker = "Popularity";
  updateUi(filteredArray, CurrentSortMarker);
  Pagination();
});
//event listner for the Price to low to high
document.getElementById("PriceLow").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingOrder(filteredArray);
  clearUI();
  CurrentSortMarker = "PriceLow";
  updateUi(filteredArray, CurrentSortMarker);
  Pagination();
});
//eventListner for the newest first
document.getElementById("NewestFirst").addEventListener("click", () => {
  sortByColorReset();
  sortAscendingDateOrder(filteredArray);
  CurrentSortMarker = "NewestFirst";
  clearUI();
  updateUi(filteredArray, CurrentSortMarker);
  Pagination();
});
//event listner for the price high to low
document.getElementById("PriceHigh").addEventListener("click", () => {
  sortByColorReset();
  sortDescendingOrder(filteredArray);
  clearUI();
  CurrentSortMarker = "PriceHigh";
  updateUi(filteredArray, CurrentSortMarker);
  Pagination();
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
  let className = classNameList.split(" ")[1];

  // Remove existing filter cards for the specific className
  let existingCards = filterContainer.querySelectorAll(`.${className}`);
  existingCards.forEach((card) => card.closest(".filtercard").remove());

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
  } else if (className == "rating") {
    filterContent.rating.forEach((value) => {
      let item = value == "4" ? "4★ & above" : "3★ & above";
      let filterCardItem = ` 
      <div class="filtercard">
        <span class="closeButtonRating"> ✕ </span>
        <span class="${className}">${item}</span>
      </div>`;
      filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    });
  } else if (className == "ram") {
    filterContent.ram.forEach((value) => {
      let filterCardItem = `
        <div class="filtercard">
          <span class="closeButtonRam"> ✕ </span>
          <span class="${className}">${
        value == 1 ? "1 GB and Below" : `${value} GB`
      }</span>
        </div>`;
      filterContainer.insertAdjacentHTML("afterbegin", filterCardItem);
    });
  }

  // Re-attach event listeners to the close buttons for each filter type
  attachCloseButtonListeners();
}

function attachCloseButtonListeners() {
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
        updateUIAfterFilterChange();
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
        cardToRemove.remove();
        let correspondingCheckbox = document.getElementById(value);
        if (correspondingCheckbox) {
          correspondingCheckbox.checked = false;
        }
        updateUIAfterFilterChange();
      }
    });
  });

  let closeButtonRam = document.querySelectorAll(".closeButtonRam");
  closeButtonRam.forEach((element) => {
    element.addEventListener("click", (event) => {
      let cardToRemove = event.target.closest(".filtercard");
      if (cardToRemove) {
        let value = parseInt(
          cardToRemove.querySelector(".ram").textContent.trim().split("")[0]
        );
        filterContent.ram.delete(value);
        cardToRemove.remove();
        let correspondingCheckbox = document.getElementById(`${value}gbram`);
        if (correspondingCheckbox.checked) {
          correspondingCheckbox.checked = false;
        }
        updateUIAfterFilterChange();
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
  Pagination();
});
// evcent listner for  the select tags action
document.getElementById("SelectMax").addEventListener("change", () => {
  let text = [];
  let SelectMaxValue = parseInt(document.getElementById("SelectMax").value);
  let SelectMin = document.getElementById("SelectMin");
  let SelectMinValue = parseInt(document.getElementById("SelectMin").value);
  let options = [0, 10000, 15000, 20000, 30000, 30001];
  let clearPriceRange = document.getElementById("clearPriceRange");
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
  Pagination();
});
// event listner for ram 4 gb
document.getElementById("4gbram").addEventListener("change", () => {
  let input = document.getElementById("4gbram");
  if (input.checked) {
    filterContent.ram.add(4);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
    Pagination();
  } else {
    filterContent.ram.delete(4);
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
//eventlistner for ram 3gb
document.getElementById("3gbram").addEventListener("change", () => {
  let input = document.getElementById("3gbram");
  if (input.checked) {
    filterContent.ram.add(3);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(3);
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
//event listner for 2gb ram
document.getElementById("2gbram").addEventListener("change", () => {
  let input = document.getElementById("2gbram");
  if (input.checked) {
    filterContent.ram.add(2);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(2);
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
//EventListner 1 gb ram and less
document.getElementById("1gbram").addEventListener("change", () => {
  let input = document.getElementById("1gbram");
  if (input.checked) {
    filterContent.ram.add(1);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(1);
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
//EventListner 8 gb ram
document.getElementById("8gbram").addEventListener("change", () => {
  let input = document.getElementById("8gbram");
  if (input.checked) {
    filterContent.ram.add(8);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(8);
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
//EventListner for 6gb ram
document.getElementById("6gbram").addEventListener("change", () => {
  let input = document.getElementById("6gbram");
  if (input.checked) {
    filterContent.ram.add(6);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(6);
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
//Event Listner for 12gb ram
document.getElementById("12gbram").addEventListener("change", () => {
  let input = document.getElementById("12gbram");
  if (input.checked) {
    filterContent.ram.add(12);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(12);
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
//Event listner for 16gbram
document.getElementById("16gbram").addEventListener("change", () => {
  let input = document.getElementById("16gbram");
  if (input.checked) {
    filterContent.ram.add(16);
    createFilterCard("input ram");
    filteredArray = applyFilterOnProducts(
      filterContent,
      filteredArray,
      products,
      CurrentSortMarker
    );
    clearUI();
    updateUi(filteredArray, CurrentSortMarker);
  } else {
    filterContent.ram.delete(16);
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
function Pagination() {
  let paginations = document.querySelector(".pagination");
  paginations.innerHTML = "";
  let countofPages = (filteredArray.length / 24).toFixed();
  for (let i = 1; i < countofPages && i < 11; i++) {
    let pageButton = document.createElement("div");
    pageButton.className = "paginationButton";
    pageButton.innerHTML = i;
    paginations.appendChild(pageButton);
  }
  let paginationButtons = document.querySelectorAll(".paginationButton");
  paginationButtons.forEach((value) => {
    if (parseInt(value.innerHTML) == page) {
      value.style.background = "#2874f0";
      value.style.color = "#fff";
    }
  });
  paginationButtons.forEach((value) => {
    value.addEventListener("click", () => {
      page = value.innerHTML;
      let count = 24;
      if (page == 1) {
        let start = 0;
        let end = 24;
        clearUI();
        updateUi(filteredArray.slice(start, end), CurrentSortMarker);
      } else {
        let start = count * (page - 1) + 1;
        let end = count * page;
        let arr = filteredArray.slice(start, end);
        if (arr.length == 0) {
          arr = filteredArray.slice(1, 24).sort((a, b) => 0.5 - Math.random());
        }
        clearUI();
        updateUi(arr, CurrentSortMarker);
      }
      paginationButtons.forEach((value) => {
        value.style.background = "#fff";
        value.style.color = "#000";
        if (parseInt(value.innerHTML) == page) {
          value.style.background = "#2874f0";
          value.style.color = "#fff";
        }
      });
    });
  });
}
fetchData()
  .then((data) => {
    header = data.header;
    products = data.products;
    main(header);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
