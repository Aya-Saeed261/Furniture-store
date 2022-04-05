// Imported Functions And Variables
import {
  updateCart,
  updateLocalStorage,
  itemsAmountHandler,
  removeItemsHandler,
  getProduct,
  cartItemsArr,
  allProductsArr,
  cartItemsList,
  totalCost,
  productsContainer,
  cartItemsNum,
  defaultAmount,
} from "./products-js.js";

// Global Variables
const productContainer = document.querySelector(".product-info .container");
const sectionHeading = document.querySelector(".heading .product-name");
const pageTitle = document.querySelector("title");
const pageUrl = window.location.href;
const productName = pageUrl
  .substring(pageUrl.indexOf("=") + 1)
  .replaceAll("%20", " ");
const product = getProduct(productName);
console.log(productName);

// Helper Functions
function showProductInfo() {
  productContainer.innerHTML = `<img src="${product.src}" alt="${
    product.name
  }" class="product-img">
  <div class="text">
    <h3 class="product-title">${product.name}</h3>
    <p class="company">by ${product.company}</p>
    <p class="price">$${product.price}</p>
    <div class="colors">
    ${product.color
      .map(
        (color) =>
          `<span class="color" style="background-color:${color}"></span>`
      )
      .join("")}
    </div>
    <p class="description">${product.description}</p>
    <button class="add-to-cart">add to cart</button>
  </div>`;
  sectionHeading.innerHTML = `${product.name}`;
  pageTitle.innerHTML = `${product.name} | Comfy`;
}

function addItemToCartHandler(e) {
  if (!e.target.matches(".add-to-cart")) return;
  let alreadyInCart = false;
  cartItemsArr.forEach((item) =>
    item.name === product.name ? (alreadyInCart = true) : ""
  );
  if (alreadyInCart) {
    cartItemsArr.forEach((item) =>
      item.name === product.name ? (item.amount += 1) : ""
    );
  } else {
    cartItemsArr.push({
      name: product.name,
      price: product.price,
      src: product.src,
      amount: defaultAmount,
    });
  }
  updateLocalStorage();
  updateCart();
}

// Main
updateCart();

showProductInfo();

cartItemsList.addEventListener("click", removeItemsHandler);

cartItemsList.addEventListener("click", itemsAmountHandler);

productContainer.addEventListener("click", addItemToCartHandler);
