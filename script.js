const productGrid = document.getElementById("productGrid");
const categoriesContainer = document.getElementById("categories");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const yearElement = document.getElementById("year");

const whatsappNumber = "917389161808";

let activeCategory = "All";


// =========================================
// RENDER CATEGORIES
// =========================================

function renderCategories() {

  const categories = [
    "All",
    ...new Set(products.map(product => product.category))
  ];

  categoriesContainer.innerHTML = categories
    .map(category => `
      <button
        class="category-button ${category === activeCategory ? "active" : ""}"
        onclick="filterProducts('${category}')"
      >
        ${category}
      </button>
    `)
    .join("");
}


// =========================================
// RENDER PRODUCTS
// =========================================

function renderProducts() {

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          product => product.category === activeCategory
        );

  productGrid.innerHTML = filteredProducts
    .map(product => {

      const imageContent = product.image
        ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
        : `<span>PRODUCT PHOTO</span>`;

      return `
        <article class="product-card">

          <div class="product-image">
            ${imageContent}
          </div>

          <div class="product-info">

            <div class="product-category">
              ${product.category}
            </div>

            <h3 class="product-name">
              ${product.name}
            </h3>

            <div class="product-meta">

              <span class="product-price">
                ${product.price}
              </span>

              <span class="product-life">
                ${product.shelfLife}
              </span>

            </div>

            <button
              class="product-button"
              onclick="openProduct(${product.id})"
            >
              VIEW PRODUCT
            </button>

          </div>

        </article>
      `;
    })
    .join("");
}


// =========================================
// FILTER
// =========================================

function filterProducts(category) {

  activeCategory = category;

  renderCategories();
  renderProducts();

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}


// =========================================
// OPEN PRODUCT
// =========================================

function openProduct(id) {

  const product = products.find(
    item => item.id === id
  );

  if (!product) return;

  const imageContent = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<span>PRODUCT PHOTO</span>`;

  const message =
    `Hello SHRI ANAND SWEETS & FOODS, I am interested in ${product.name}. Please share wholesale price and availability.`;

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  modalBody.innerHTML = `

    <div class="modal-product-image">
      ${imageContent}
    </div>

    <div class="modal-category">
      ${product.category}
    </div>

    <h2 class="modal-title">
      ${product.name}
    </h2>

    <div class="modal-details">

      <div class="detail-box">
        <span>Wholesale Price</span>
        <strong>${product.price}</strong>
      </div>

      <div class="detail-box">
        <span>Shelf Life</span>
        <strong>${product.shelfLife}</strong>
      </div>

    </div>

    <a
      class="modal-whatsapp"
      href="${whatsappURL}"
      target="_blank"
      rel="noopener"
    >
      ENQUIRE ON WHATSAPP
    </a>

  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


// =========================================
// CLOSE MODAL
// =========================================

function closeModal() {

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


document.addEventListener("click", event => {

  if (
    event.target.matches("[data-close-modal]") ||
    event.target.classList.contains("modal-overlay")
  ) {
    closeModal();
  }

});


// =========================================
// ESC KEY
// =========================================

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal();
  }

});


// =========================================
// CURRENT YEAR
// =========================================

yearElement.textContent =
  new Date().getFullYear();


// =========================================
// START CATALOGUE
// =========================================

renderCategories();
renderProducts();