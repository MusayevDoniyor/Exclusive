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
const usernameInput = document.getElementById("emailOrNumber");
const passwordInput = document.getElementById("password");
const form = document.getElementsByTagName("form")[0];
const loginBtn = document.getElementById("loginBtn");

// console.log(usernameInput);
// console.log(passwordInput);
// console.log(form);
// console.log(loginBtn);

let username, password;

init();

function init() {
  redirect();
  usernameInput.oninput = function (event) {
    username = event.target.value.trim();
  };

  passwordInput.oninput = function (event) {
    password = event.target.value.trim();
  };

  form.onsubmit = async function (event) {
    event.preventDefault();

    console.log(username);

    const result = await login();

    saveToken(result.token);
    redirect();
  };
}

async function login() {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
}

function saveToken(token) {
  localStorage.setItem("token", token);
}

function redirect() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.replace(
      "https://MusayevDoniyor.github.io/Exclusive/index.html"
    );
  }
}
