export function sortAscendingOrder(products) {
  products.sort((a, b) => a.price - b.price);
}

export function sortDescendingOrder(products) {
  products.sort((a, b) => b.price - a.price);
}

export function sortPopularityOrder(products) {
  products.sort((a, b) => b.rating.average - a.rating.average);
}

export function sortRelevanceOrder(products) {
  products.sort((a, b) => 0.5 - Math.random());
}
