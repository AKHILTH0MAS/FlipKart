export function sortAscendingOrder(products) {
    products.sort((a, b) => a.price - b.price);
  }
  
  export function sortDescendingOrder(products) {
    products.sort((a, b) => b.price - a.price);
  }
  