// Imported Functions And Variables
import {
  updateCart,
  updateLocalStorage,
  itemsAmountHandler,
  removeItemsHandler,
  cartItemsArr,
  cartItemsList,
  totalCost,
  cartItemsNum,
} from "./products-js.js";

// Main
updateCart();

cartItemsList.addEventListener("click", removeItemsHandler);

cartItemsList.addEventListener("click", itemsAmountHandler);
