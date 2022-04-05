// Global Variables
const cartItemsArr = JSON.parse(window.localStorage.getItem("cartItems")) || [];
const allProductsArr = JSON.parse(window.localStorage.getItem("allProducts"));
const cartItemsList = document.querySelector(".items-added-list");
const totalCost = document.querySelector(".total-price-value");
const productsContainer = document.querySelector(".products");
const cartItemsNum = document.querySelector(".items-num");
const defaultAmount = 1;

// Helper Functions
function updateLocalStorage() {
  window.localStorage.setItem("cartItems", JSON.stringify(cartItemsArr));
}

function updateCart() {
  cartItemsList.innerHTML = cartItemsArr
    .map((item) => {
      return `<li class="item" data-name="${item.name}" data-price="${item.price}" data-amount="${item.amount}">
    <img src="${item.src}" alt="product" class="item-pic">
    <div class="middle">
      <div class="item-info">
        <p class="item-title">${item.name}</p>
        <p class="item-price">$${item.price}</p>
      </div>
      <button class="remove-item-btn">remove</button>
    </div>
    <div class="amount">
      <button class="increase-btn"><i class="fa-solid fa-angle-up"></i></button>
      <span class="amount-num">${item.amount}</span>
      <button class="decrease-btn"><i class="fa-solid fa-angle-down"></i></button>
    </div>
  </li>`;
    })
    .join("");
  cartItemsNum.innerHTML = `${cartItemsArr.length}`;
  let totalCostValue = cartItemsArr.reduce(
    (prev, curr) => prev + curr.price * curr.amount,
    0
  );
  totalCost.innerHTML = `$${totalCostValue.toFixed(2)}`;
}

function getProduct(name) {
  let product = allProductsArr.filter((product) => product.name === name)[0];
  return product;
}

function addItemToCartHandler(e) {
  if (!e.target.matches(".add-to-cart")) return;
  let productContainer = e.target.closest(".product-container");
  let productName = productContainer.querySelector(".product-title").innerHTML;
  let product = getProduct(productName);
  let alreadyInCart = false;
  cartItemsArr.forEach((item) =>
    item.name === productName ? (alreadyInCart = true) : ""
  );
  if (alreadyInCart) {
    cartItemsArr.forEach((item) =>
      item.name === productName ? (item.amount += 1) : ""
    );
  } else {
    cartItemsArr.push({
      name: productName,
      price: product.price,
      src: product.src,
      amount: defaultAmount,
    });
  }
  updateCart();
  updateLocalStorage();
}

function itemsAmountHandler(e) {
  if (!e.target.matches(".amount i")) return;
  let listItem = e.target.closest(".item");
  let amountValue = +listItem.dataset.amount;
  let itemName = listItem.dataset.name;
  e.target.matches(".increase-btn i") ? amountValue++ : amountValue--;
  if (amountValue === 0) {
    let itemIndex = cartItemsArr.findIndex(
      (item) => item.name === listItem.dataset.name
    );
    cartItemsArr.splice(itemIndex, 1);
    listItem.remove();
  }
  cartItemsArr.forEach((item) =>
    item.name === itemName ? (item.amount = amountValue) : ""
  );
  updateCart();
  updateLocalStorage();
}

function removeItemsHandler(e) {
  if (!e.target.matches(".remove-item-btn")) return;
  let listItem = e.target.closest(".item");
  let itemIndex = cartItemsArr.findIndex(
    (item) => item.name === listItem.dataset.name
  );
  listItem.remove();
  cartItemsArr.splice(itemIndex, 1);
  updateCart();
  updateLocalStorage();
}

function moreInfoHandler(e) {
  if (!e.target.matches(".more-info")) return;
  let itemName = e.target.dataset.name;
  window.open(`product.html?product=${itemName}`, "_self");
}

// Main
updateCart();

if (productsContainer) {
  productsContainer.addEventListener("click", addItemToCartHandler);
  productsContainer.addEventListener("click", moreInfoHandler);
}

cartItemsList.addEventListener("click", removeItemsHandler);

cartItemsList.addEventListener("click", itemsAmountHandler);

// Exported Functions And Variables
export {
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
};
