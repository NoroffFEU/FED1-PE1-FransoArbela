import { logoutAccount, redirectToLogin } from "/assets/js/auth/logout.js";

// getting data from local storage
const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);

document.addEventListener("DOMContentLoaded", () => {
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

// in case the user is not logged in, my name will be displayed in the url,
// if they are logged in, their name will be displayed
export function getUsername() {
  const loginDataString = localStorage.getItem("loginData");
  if (!loginDataString) return "Samal";
  try {
    const loginData = JSON.parse(loginDataString);
    return loginData?.data?.name || "Samal";
  } catch (error) {
    return "Samal";
  }
}
