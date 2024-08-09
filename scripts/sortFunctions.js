export function sortAscendingOrder(products) {
  products.sort((a, b) => a.price - b.price);
}

export function sortDescendingOrder(products) {
  products.sort((a, b) => b.price - a.price);
}

export function sortPopularityOrder(products) {
  products.sort((a, b) => b.rating.average - a.rating.average);
}

export function sortPopularityDescendingOrder(products) {
  products.sort((a, b) => a.rating.average -  b.rating.average);
}
export function sortRelevanceOrder(products) {
  products.sort((a, b) => 0.5 - Math.random());
}

export function sortAscendingDateOrder(products){
  products.sort((a,b) => {
   let  date1 = new Date(a.newLaunchDate);
  let  date2 = new Date(b.newLaunchDate);
    return date1 - date2
  })
}

  // applyFilterOnProducts(){
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
  // }