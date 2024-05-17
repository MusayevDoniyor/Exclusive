// * Additional Scripts

// Language Select
const languageToggle = document.getElementById("languageToggle");
const languageOptions = document.getElementById("languageOptions");
const languageOptionLinks = document.querySelectorAll(".languageOption");
const languageText = document.querySelector(".languageSelect a p");

languageToggle.addEventListener("click", function () {
  languageOptions.style.display =
    languageOptions.style.display === "block" ? "none" : "block";
});

languageOptionLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    languageText.firstChild.textContent = link.textContent;
    languageOptions.style.display = "none";
  });
});

// Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", function () {
    mainNav.style.display =
      mainNav.style.display === "block" ? "none" : "block";
  });
});

// * Main Code

init();

async function init() {
  const spinner = document.querySelector(".spinner");
  spinner.style.display = "block";

  const productId = getId();
  const product = await fetchProducts(productId);

  if (product) {
    renderProducts(product);
    spinner.style.display = "none";
  } else {
    console.error("Product not found or failed to fetch");
    spinner.style.display = "none";
  }
}

function getId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  return id;
}

async function fetchProducts(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

function generateStars(rate) {
  const starsTotal = 5;
  const roundedRate = Math.round(rate);

  let stars = "";
  for (let i = 1; i <= starsTotal; i++) {
    if (i <= roundedRate) {
      stars += "⭐"; // Filled star
    } else {
      stars += "☆"; // Empty star
    }
  }

  return stars;
}

function renderProducts(product) {
  const productTitle = document.querySelector(".productName > b");
  const productImg = document.querySelector(".imgSide > img");
  const productName = document.querySelector(".title > h2");
  const stars = document.querySelector(".stars");
  const reviews = document.querySelector(".reviews");
  const price = document.querySelector(".price > b");
  const description = document.querySelector(".description > p");

  productTitle.innerHTML = product.category;
  productImg.src = product.image;
  productName.innerHTML = product.title;
  stars.innerHTML = generateStars(Math.round(product.rating.rate));
  reviews.innerHTML = `(${product.rating.count} Reviews)`;
  price.innerHTML = `$${product.price}`;
  description.innerHTML = product.description;
}
