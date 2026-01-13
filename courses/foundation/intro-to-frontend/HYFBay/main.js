console.log("Script loaded");

console.log("Script loaded");


const products = getAvailableProducts();
console.log(products);

const searchInput = document.createElement("input");
searchInput.id = "search";
searchInput.placeholder = "Search products...";
document.querySelector("main").appendChild(searchInput);


function renderProducts(products) {
 
  let ul = document.querySelector("#product-list");
  if (!ul) {
    ul = document.createElement("ul");
    ul.id = "product-list";
    document.querySelector("main").appendChild(ul);
  }

 
  ul.innerHTML = "";

 
  products.forEach(product => {
    const li = document.createElement("li");

  
    const price = (product.price / 100).toFixed(2);
    const stars = "⭐".repeat(Math.round(product.rating));

    li.innerHTML = `
      <h2>${product.name}</h2>
      <p>Price: $${price}</p>
      <p>Rating: ${stars}</p>
    `;

    ul.appendChild(li);
  });
}

renderProducts(products);


searchInput.addEventListener("input", e => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
});
