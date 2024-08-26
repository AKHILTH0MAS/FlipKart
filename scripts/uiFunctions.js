export function navBar(nav) {
  let navBarContainer = document.querySelector(".navbar-container");

  let logoParent = document.createElement("div");
  logoParent.className = "navbar-logo-container";
  let logo = `
    <div class="navbar-logo">
      <div class="logo-row-1">
        <img width="75px" src="${nav.logo.logoImg}" alt="logo" />
      </div>
      <div class="logo-row-2">
        <p>${nav.logo.logoText1}</p>
        <span>${nav.logo.logoText2}</span>
        <img width="10px" height="10px" src="${nav.logo.logoSvg}" alt="plus" />
      </div>
    </div>
  `;
  navBarContainer.appendChild(logoParent);
  logoParent.insertAdjacentHTML("beforeend", logo);

  let searchBar = `
    <div class="searchbar">
      <div class="searchBar-container">
        <input type="text" class="inputFeild" name="Search" id="search" placeholder="${nav.searchplaceHolder}">
      </div>
      <div class="search-icon">
        <img src="${nav.searchIcon}" alt="searchIcon" />
      </div>
    </div>`;
  navBarContainer.insertAdjacentHTML("beforeend", searchBar);

  let login = document.createElement("div");
  login.className = "login";
  login.innerHTML = nav.loginButton;
  navBarContainer.appendChild(login);

  nav.StanderdButton.forEach((element) => {
    let standerdButton = document.createElement("div");
    standerdButton.className = "standard";
    let standerdButtonSpan = document.createElement("span");
    standerdButtonSpan.innerHTML = element.text;
    standerdButton.appendChild(standerdButtonSpan);
    let standerdButtonImage = document.createElement("img");
    standerdButtonImage.src = element.image;
    standerdButtonImage.className =
      element.id == "cart" ? "cart" : "caret-down";
    if (element.before && element.image) {
      standerdButtonSpan.before(standerdButtonImage);
    } else if (!element.before && element.image) {
      standerdButtonSpan.after(standerdButtonImage);
    }
    navBarContainer.appendChild(standerdButton);
  });
}

export function secondaryNavBar(data) {
  let nav = document.querySelector("nav");
  let secondaryNavBarWrapper = `<div class="secondaryNavBarWrapper"><span></span></div>`;
  let secondaryNavbar = document.createElement("div");
  secondaryNavbar.className = "secondary-nav";
  nav.appendChild(secondaryNavbar);
  secondaryNavbar.insertAdjacentHTML("afterend", secondaryNavBarWrapper);

  let secondaryNavChild = document.createElement("div");
  secondaryNavChild.className = "secondary-nav-child";
  secondaryNavbar.appendChild(secondaryNavChild);

  data.navitem.forEach((element, index) => {
    let secondaryNavItem = `
      <div class="secondary-nav-item">
        <span>${element}</span>
        <img class="caret-down fill-svg" src="${data.caretDown}" alt="" />
      </div>`;
    let secondaryNavItem2 = `
      <div class="secondary-nav-item">
        <span>${element}</span>
      </div>`;
    if (index < data.navitem.length - 3) {
      secondaryNavChild.insertAdjacentHTML("beforeend", secondaryNavItem);
    } else {
      secondaryNavChild.insertAdjacentHTML("beforeend", secondaryNavItem2);
    }
  });
}

export function mobileContainerHeader(data, mobiles) {
  let pageLocation = document.querySelector(".pageLocation");
  pageLocation.innerHTML = `
    <span>Home</span>
    <span>></span>
    <span class="pagelocationSpan">${data.pageLocation}</span>
    <span> > </span>
    <span>${data.product}</span>`;
  let searchHeadingData = document.getElementById("searchHeadingData");
  searchHeadingData.innerHTML = `1 - 24 of ${mobiles.length}`;
  let searchHeadingProduct = document.getElementById("searchHeadingProduct");
  searchHeadingProduct.innerText = `"${data.product}"`;
}

export function mobileCard(element) {
  let mobilesContainer = document.querySelector(".mobilesContainerWrapper");
  let mobileChildContainer = document.createElement("div");
  mobileChildContainer.className = "mobileChildContainer";
  mobilesContainer.appendChild(mobileChildContainer);

  let mobileImageContainer = document.createElement("div");
  mobileImageContainer.className = "mobileImageContainer";
  let mobileImage = document.createElement("img");
  mobileImage.className = "mobileImage";
  mobileImage.src = element.images[0];
  let addtoCompare = document.createElement("div");
  addtoCompare.className = "addtocompareButton";
  addtoCompare.innerHTML = `<div class="addtocompareButtonChild"><input type="checkbox" name="" id=""> Add to Compare </div>`;
  mobileImageContainer.appendChild(mobileImage);
  mobileImageContainer.appendChild(addtoCompare);
  mobileChildContainer.appendChild(mobileImageContainer);

  let specInfoContainer = document.createElement("div");
  specInfoContainer.className = "specInfoContainer";
  mobileChildContainer.appendChild(specInfoContainer);

  let specInfoPartitionFirst = document.createElement("div");
  specInfoPartitionFirst.className = "specInfoPartitionFirst";
  specInfoContainer.appendChild(specInfoPartitionFirst);

  let specInfoPartitionSecond = document.createElement("div");
  specInfoPartitionSecond.className = "specInfoPartitionSecond";
  specInfoContainer.appendChild(specInfoPartitionSecond);

  if (element.isSponsored) {
    let isSponsered = document.createElement("div");
    isSponsered.className = "isSponsered";
    isSponsered.innerHTML = "Sponsored";
    specInfoPartitionFirst.appendChild(isSponsered);
  }

  let productName = document.createElement("div");
  productName.className = "productName";
  productName.innerHTML = `<span>${element.title}</span>`;
  specInfoPartitionFirst.appendChild(productName);

  let productRating = document.createElement("div");
  productRating.className = "productRating";
  specInfoPartitionFirst.appendChild(productRating);

  let productRatingButton = document.createElement("div");
  productRatingButton.className = "productRatingButton";
  productRatingButton.innerHTML = `<span>${element.rating.average}</span><img src="assets/images/star.svg">`;
  productRating.appendChild(productRatingButton);

  let productRatingText = document.createElement("p");
  productRatingText.className = "productRatingText";
  productRatingText.innerText = `${element.rating.count.toLocaleString()} Ratings & ${element.rating.reviewCount.toLocaleString()} Reviews`;
  productRating.appendChild(productRatingText);

  let specificationContainer = document.createElement("div");
  specificationContainer.className = "specificationContainer";
  specInfoPartitionFirst.appendChild(specificationContainer);

  let specUl = document.createElement("ul");
  specUl.className = "specUl";
  element.highlights.forEach((value) => {
    let specElement = document.createElement("li");
    specElement.innerHTML = value;
    specElement.className = "specElement";
    specUl.appendChild(specElement);
  });
  specificationContainer.appendChild(specUl);

  let priceTextflex = document.createElement("div");
  specInfoPartitionSecond.appendChild(priceTextflex);
  priceTextflex.className = "priceTextflex";

  let priceContainer = document.createElement("div");
  priceTextflex.appendChild(priceContainer);
  if (element.price == null || element.mrp == null) {
    element.price = 14000;
    element.mrp = 15000;
  }

  let pricetext = document.createElement("div");
  pricetext.className = "pricetext";
  pricetext.innerHTML = `₹${element.price.toLocaleString()}`;
  priceContainer.appendChild(pricetext);

  let priceTextoff = document.createElement("div");
  priceTextoff.className = "priceTextOff";
  let offpercent = ((element.mrp - element.price) / element.mrp) * 100;
  priceTextoff.innerHTML = `<span>₹${element.mrp.toLocaleString()}</span> ${offpercent.toFixed(
    0
  )}% Off`;
  priceContainer.appendChild(priceTextoff);

  let flipAssured = document.createElement("img");
  flipAssured.className = "flipAssured";
  flipAssured.src = "assets/images/fa_62673a.png";
  flipAssured.style.height = "21px";
  priceTextflex.appendChild(flipAssured);

  let deliveryText = document.createElement("div");
  deliveryText.className = "deliveryText";
  deliveryText.innerHTML = "Free delivery";
  priceContainer.appendChild(deliveryText);

  let saveText = document.createElement("div");
  saveText.className = "saveText";
  saveText.innerHTML = "Save Extra";
  specInfoPartitionSecond.appendChild(saveText);

  let bankOffer = document.createElement("div");
  bankOffer.className = "bankOffer";
  bankOffer.innerHTML = "Bank Offer";
  specInfoPartitionSecond.appendChild(bankOffer);
}

export function clearPriceRange() {
  let selectMin = document.getElementById("SelectMin");
  let selectMax = document.getElementById("SelectMax");
  selectMin.value = 0;
  selectMax.value = 30001;
  selectMax.dispatchEvent(new Event("click"));
  selectMin.dispatchEvent(new Event("click"));
}

export function updateUi(products, CurrentSortMarker, start = 1,end = 24, length = products.length) {
  let mobilesContainer = document.querySelector(".mobilesContainerWrapper");
  mobilesContainer.innerHTML = "";
  let id = document.getElementById(CurrentSortMarker);
  id.style.color = "#2874f0";
  id.style.borderBottom = '2px solid #2374f0';
  id.style.fontFamily = "Inter-semibold";
  let searchHeadingData = document.getElementById("searchHeadingData");
  searchHeadingData.innerHTML = `${start} - ${end} of ${length}`;

  if (products.length == 0) {
    noResultfound();
  } else {
    for (let i = 0; i < products.length && i < 24; i++) {
      mobileCard(products[i]);
    }
  }
  document.scrollingElement.scrollTop = 0;
}
export function noResultfound() {
  let mobileContainerWrapper = document.querySelector(
    ".mobilesContainerWrapper"
  );

  let noResultFound = `<div class="noResultFound">
                <div class="noResultFoundChild">
                  <div class="noResultFoundImage">
                    <img src="assets/images/error-no-search-results_2353c5.png" alt="no result found image">
                  </div>
                  <div class="noResultFoundHeading">
                    Sorry, no results found!
                  </div>
                  <div class="noResultFoundText">
                    Please check the spelling or try searching for something else
                  </div>
                </div>
              </div>`;

  mobileContainerWrapper.insertAdjacentHTML("beforeend", noResultFound);
}
export function applyFilterOnProducts(
  filterContent,
  filteredArray,
  products,
  CurrentSortMarker
) {
  let filterHasdata = Object.values(filterContent).some((value) => {
    if (value instanceof Set && value.size > 0) {
      return true;
    } else if (value.min != null && value.max != null) {
      return true;
    } else {
      return false;
    }
  });
  if (filterHasdata) {
    filteredArray = [];
    filteredArray = products.filter((product) => {
      for (let filter in filterContent) {
        if (
          filterContent.brand.size > 0 &&
          !filterContent.brand.has(product.brand)
        ) {
          return false;
        }
        if (
          filterContent.priceRange.max != null &&
          filterContent.priceRange.min != null
        ) {
          if (
            product.price < filterContent.priceRange.min ||
            product.price > filterContent.priceRange.max
          ) {
            return false;
          }
        }
        if (
          filterContent.rating.size > 0 &&
          !filterContent.rating.has(Math.floor(product.rating.average))
        ) {
          return false;
        }
        if (filterContent.ram.size > 0 && !filterContent.ram.has(product.ram)) {
          return false;
        }
        return true;
      }
    });
    return filteredArray;
  } else {
    return (filteredArray = [...products]);
  }
}
export function footer(footerData) {
  // let footer = document.querySelector("footer");
  // let footerChild = document.createElement("div");
  // footerChild.className = "footerchild";
  // footer.appendChild(footerChild);
  // let footerElementItems;
  // footerData.footerItemPart1.forEach((element) => {
  //   footerElementItems = "";
  //   let footerElement = `<div class="footerItemHeading">${element.heading}</div>`;
  //   footerElementItems = footer
  // });
}
