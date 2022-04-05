// Global Variables
let allProducts = [];

class Product {
  constructor(name, price, company, src, color, description) {
    this.name = name;
    this.price = price;
    this.company = company;
    this.src = src;
    this.color = color;
    this.description = description;
  }
}

allProducts[0] = new Product(
  "High-Back Bench",
  19.99,
  "ikea",
  "imgs/product-1.jpeg",
  ["red", "BADA55"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[1] = new Product(
  "Albany Table",
  79.99,
  "marcos",
  "imgs/product-2.jpeg",
  ["thistle", "pink"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[2] = new Product(
  "Wooden Table",
  45.99,
  "caressa",
  "imgs/product-3.jpeg",
  ["gold", "mediumslateblue"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[3] = new Product(
  "Accent Chair",
  25.99,
  "caressa",
  "imgs/product-4.jpeg",
  ["maroon", "dodgerblue"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[4] = new Product(
  "Dining Table",
  66.99,
  "caressa",
  "imgs/product-5.jpg",
  ["darkred", "darkorange"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[5] = new Product(
  "Sofa Set",
  36.99,
  "liddy",
  "imgs/product-6.jpeg",
  ["cornflowerblue", "violet"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[6] = new Product(
  "Modern Bookshelf",
  8.99,
  "marcos",
  "imgs/product-7.jpg",
  ["yellowgreen", "tan"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[7] = new Product(
  "Emperor Bed",
  21.99,
  "liddy",
  "imgs/product-8.jpg",
  ["springgreen", "plum"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[8] = new Product(
  "Utopia Sofa",
  59.55,
  "marcos",
  "imgs/product-9.jpg",
  ["lightcoral", "silver"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[9] = new Product(
  "Entertainment Center",
  29.89,
  "liddy",
  "imgs/product-10.jpg",
  ["peru", "palegreen"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[10] = new Product(
  "Albany Sectional",
  10.99,
  "ikea",
  "imgs/product-11.jpeg",
  ["indigo", "greenyellow"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

allProducts[11] = new Product(
  "Leather Sofa",
  33.99,
  "liddy",
  "imgs/product-12.jpg",
  ["navajowhite", "navy"],
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium natus ipsam, exercitationem expedita animi."
);

const productsConatiner = document.querySelector(".products");
const categories = document.querySelectorAll("[data-group]");
const userSearch = document.querySelector("#search");
const dropDownCategriesList = document.querySelector(".categories");
const categoriesContainer = document.querySelector(
  ".categories-container .title"
);
const categoriesIcons = categoriesContainer.querySelectorAll("i");
const priceRangeInput = document.querySelector("#price");
const priceValue = document.querySelector(".price-value");
const filtersContainer = document.querySelector(".filter");
let filterGroup = "all",
  maxPrice = 80,
  listOpened = false,
  filteredProducts = filterProducts(allProducts);

// Helper Functions
function populateProducts(products) {
  productsConatiner.innerHTML =
    products
      .map((product) => {
        return `<div class="product-container">
      <div class="product">
        <img src="${product.src}" alt="${product.name}" class="product-pic">
        <div class="overlay">
          <button><i class="fa-solid fa-magnifying-glass more-info" data-name="${product.name}"></i></button>
          <button><i class="fa-solid fa-cart-shopping add-to-cart"></i></button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-title">${product.name}</p>
        <p class="product-price">$ ${product.price}</p>
      </div>
    </div>`;
      })
      .join("") || "Sorry, no products matched your search";
}

function filterProducts(products) {
  return products.filter((product) =>
    filterGroup !== "all"
      ? product.price <= maxPrice && product.company === filterGroup
      : product.price <= maxPrice
  );
}

function companyFilterHandler() {
  filterGroup = this.dataset.group;
  categories.forEach((category) => category.classList.remove("active"));
  this.classList.add("active");
  filteredProducts = filterProducts(allProducts);
  populateProducts(filteredProducts);
}

function priceFilterHandler() {
  maxPrice = +this.value;
  priceValue.innerHTML = `$${maxPrice}`;
  filteredProducts = filterProducts(allProducts);
  populateProducts(filteredProducts);
}

function findMatchingProducts() {
  let search = new RegExp(userSearch.value, "ig");
  let matchingProducts = filteredProducts.filter((product) =>
    search.test(product.name)
  );
  populateProducts(matchingProducts);
}

function toggleList() {
  dropDownCategriesList.classList.toggle("hidden");
  categoriesIcons.forEach((icon) => icon.classList.toggle("hidden"));
  listOpened = !listOpened;
}

function closeDropList(e) {
  if (e.target.closest(".categories-container .title")) return;
  if (listOpened) toggleList();
}

// Main
window.localStorage.setItem("allProducts", JSON.stringify(allProducts));

populateProducts(allProducts);

categories.forEach((category) =>
  category.addEventListener("click", companyFilterHandler)
);

userSearch.addEventListener("input", findMatchingProducts);

priceRangeInput.addEventListener("input", priceFilterHandler);

categoriesContainer.addEventListener("click", toggleList);

document.addEventListener("click", closeDropList);
