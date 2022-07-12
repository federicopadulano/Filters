let filteredProducts = [...products];
const productsContainer = document.querySelector(".products-container");
const displayProduct = () => {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = "<h2>Nessun prodotto trovato!</h2>";
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map((product) => {
      const { id, title, image, price } = product;
      return `<article class="product" data-id="${id}">
          <img
            src="${image}"
            class="product-img img"
            alt=""
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>`;
    })
    .join("");
};

displayProduct();

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProduct();
});

// FILTER BTN

const companiesDOM = document.querySelector(".companies");

const displayBtn = () => {
  const buttons = [
    "all",
    ...new Set(
      products.map((btn) => {
        return btn.company;
      })
    ),
  ];

  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class="company-btn" data-id="${company}">${company}</button>`;
    })
    .join("");
};

displayBtn();

companiesDOM.addEventListener("click", (e) => {
  // e.preventDefault();

  const element = e.target;

  if (element.classList.contains("company-btn")) {
    if (element.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((item) => {
        return item.company === element.dataset.id;
      });
    }
    displayProduct();
    searchInput.value = "";
  }
});
