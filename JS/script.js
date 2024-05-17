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

// Dates
function updateClock() {
  const now = new Date();

  const hourDiv = document.getElementById("hour");
  const dayDiv = document.getElementById("day");
  const minuteDiv = document.getElementById("minutes");
  const secondDiv = document.getElementById("second");

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  hourDiv.innerHTML = `<span>${hours}</span>  Hours`;
  dayDiv.innerHTML = `<span>${now.getDate()}</span> Days`;
  minuteDiv.innerHTML = `<span>${minutes}</span> Minutes`;
  secondDiv.innerHTML = `<span>${seconds}</span> Seconds`;
}

setInterval(updateClock, 1000);

// * Main code started

async function fetchProducts() {
  const spinner = document.querySelector(".spinner");
  spinner.style.display = "block";

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();

    spinner.style.display = "none";

    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    spinner.style.display = "none";
  }
}

async function displayProducts() {
  const products = await fetchProducts();
  const productsContainer = document.querySelector(".containerCards");

  products.forEach(function (product) {
    const iconLike = document.createElement("i");
    const iconLikeLink = document.createElement("a");
    iconLikeLink.href = "#like";
    iconLikeLink.append(iconLike);
    iconLike.classList.add("bx");
    iconLike.classList.add("bx-heart");
    const iconShow = document.createElement("i");
    const iconShowLink = document.createElement("a");
    iconShowLink.append(iconShow);
    iconShow.classList.add("bx");
    iconShow.classList.add("bx-show-alt");
    iconShowLink.href = "#show";

    const productImg = product.image;
    const cartbtn = document.createElement("button");
    cartbtn.classList.add("cart-btn");
    cartbtn.textContent = "Add to Cart";
    const productTitle = product.title;
    const productPrice = `$${product.price}`;
    const productDescription = product.description;
    const productRate = generateStars(Math.round(product.rating.rate));
    const productCount = `(${product.rating.count})`;

    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    const image = document.createElement("img");
    image.src = productImg;

    const title = document.createElement("a");
    title.href = `http://127.0.0.1:5500/product.html?id=${product.id}`;
    title.classList.add("productTitle");
    title.textContent = productTitle;

    const description = document.createElement("p");
    description.classList.add("productDescription");
    description.textContent = productDescription;

    const price = document.createElement("b");
    price.classList.add("productPrice");
    price.textContent = productPrice;

    const rateStars = document.createElement("p");
    rateStars.classList.add("productRateStars");
    rateStars.textContent = productRate;

    const ratingCount = document.createElement("span");
    ratingCount.classList.add("ratingCount");
    ratingCount.textContent = productCount;

    productsContainer.appendChild(productCard);
    productCard.appendChild(iconLikeLink);
    productCard.appendChild(iconShowLink);
    productCard.appendChild(image);
    productCard.append(cartbtn);
    productCard.appendChild(title);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(rateStars);
    productCard.appendChild(ratingCount);

    // Append to HTML
    productsContainer.append(productCard);
  });
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

function redirect() {
  const token = localStorage.getItem("token");

  // No Token
  if (!token) {
    window.location.replace("http://127.0.0.1:5500/login.html");
  }
}

updateClock();
displayProducts();
redirect();
