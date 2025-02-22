import {
  logoutAccount,
  redirectToLogin,
  checkLogin
} from "/assets/js/scriptComponents/logout.js";

// =============== the changes in this file is made in case the admin is logged in

// getting data from local storage
const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);

document.addEventListener("DOMContentLoaded", () => {
  if (loginData) {
    // change the login button to the author's name
    const authorName = loginData.data.name;

    const navElementWrapper = document.querySelector(".nav-element-wrapper");
    const offScreenNav = document.querySelector(".offscreen-nav");

    // create a log out button when user is logged in
    const createLogoutButton = () => {
      const button = document.createElement("button");
      button.className = "logout primary-button";
      button.textContent = "Log out";
      return button;
    };

    offScreenNav?.appendChild(createLogoutButton());
    navElementWrapper?.appendChild(createLogoutButton());

    // change the login text to the authors name
    // and the direction path to profile instead of login page
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
    const logout = document.querySelectorAll(".logout");
    logout.forEach((btn) => {
      btn.addEventListener("click", () => {
        logoutAccount();
        redirectToLogin();
        checkLogin();
      });
    });
  }
});

// in case the user is not logged in, my name will be displayed in the url to show my posts on the blog feed,
// if they are logged in, their name will be displayed.
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
