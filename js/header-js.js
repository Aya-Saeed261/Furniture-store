// Global Variables
const navMenuBtn = document.querySelector(".nav-menu-small-screen");
const navMenu = document.querySelector(".nav-links");
const shoppingCartContainer = document.querySelector(
  ".shopping-cart-container"
);
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartBtn = document.querySelector(".shopping-list-btn");
const closeShoppingCartBtn = document.querySelector(".close-shopping-btn");
let navMenuOpen = false;

// Helper Functions
function toggleNavMenu() {
  navMenuBtn.classList.toggle("opened");
  navMenu.classList.toggle("hidden");
  navMenuOpen = !navMenuOpen;
}

function closeNavMenu(e) {
  if (e.target.closest(".nav-menu-small-screen")) return;
  if (navMenuOpen) toggleNavMenu();
}

function toggleShoppingCart() {
  shoppingCartContainer.classList.toggle("show-shoppping-list");
}

// Main
navMenuBtn.addEventListener("click", toggleNavMenu);

document.addEventListener("click", closeNavMenu);

shoppingCartBtn.addEventListener("click", toggleShoppingCart);

closeShoppingCartBtn.addEventListener("click", toggleShoppingCart);
