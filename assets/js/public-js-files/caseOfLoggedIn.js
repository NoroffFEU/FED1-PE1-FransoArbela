import { logoutAccount, redirectToLogin } from "/assets/js/auth/logout.js";

const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector("#postsContainer");

  if (loginData) {
    // change the login button to the author's name
    const authorName = loginData.data.name;
    const nav = document.querySelector("nav");
    const logoutButton = document.createElement("button");
    logoutButton.className = "logout";
    logoutButton.textContent = "log out";
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.innerHTML = `${authorName}`;
    loginBtn.id = "profileBtn";
    loginBtn.href = "/pages/profile.html";
    nav.appendChild(logoutButton);

    // remove register button
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.remove();

    // logout functionality
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", () => {
      logoutAccount();
      redirectToLogin();
    });
  }

});
