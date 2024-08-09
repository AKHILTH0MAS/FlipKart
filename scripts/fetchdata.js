export async function fetchData() {
  let response = await fetch("index.json");
  let headerData = await response.json();

  let res = await fetch("allproducts.json");
  let productsData = await res.json();
  return {
    header: headerData,
    products: productsData,
  };
}
