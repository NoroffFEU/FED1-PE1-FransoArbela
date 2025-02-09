import { logoutAccount, redirectToLogin } from "/assets/js/auth/logout.js";

// getting data from local storage
const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);

document.addEventListener("DOMContentLoaded", () => {
  if (loginData) {
    // change the login button to the author's name
    const authorName = loginData.data.name;

    const nav = document.querySelector("nav");
    const offScreenNav = document.querySelector(".offscreen-nav");

    // create a log out button when user is logged in
    const createLogoutButton = () => {
      const button = document.createElement("button");
      button.className = "logout primary-button";
      button.textContent = "Log out";
      return button;
    };

    offScreenNav?.appendChild(createLogoutButton());
    nav?.appendChild(createLogoutButton()); 

    // change the log in text to the authors name
    // and the direction path to profile instead of log in page
    const loginBtn = document.querySelector("#loginBtn");
    const offScreenLoginBtn = document.querySelector("#offscreen-loginBtn");

    loginBtn.innerHTML = `${authorName}`;
    offScreenLoginBtn.innerHTML = `${authorName}`;

    loginBtn.id = "profileBtn";
    loginBtn.href = "/pages/profile.html";
    offScreenLoginBtn.id = "profileBtn";
    offScreenLoginBtn.href = "/pages/profile.html";

    // remove register button
    const registerBtn = document.querySelector("#registerBtn");
    const offScreenRegisterBtn = document.querySelector(
      "#offscreen-registerBtn"
    );
    registerBtn.remove();
    offScreenRegisterBtn.remove();



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
