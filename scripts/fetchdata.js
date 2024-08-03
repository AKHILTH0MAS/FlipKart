export async function fetchData() {
  const url = "https://real-time-flipkart-api.p.rapidapi.com/products-by-category?category_id=tyy%2C4io&page=14";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1079f0aca8mshe1cb02140673f0ap16fe5fjsn0d566b8b5a40",
      "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
    },
  };

  let response = await fetch("index.json");
  let headerData = await response.json();

  let res = await fetch(url, options);
  let productsData = await res.json();

  return {
    header: headerData,
    products: productsData.products
  };
}
