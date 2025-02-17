import {
  checkLogin,
} from "/assets/js/scriptComponents/logout.js";

// Select DOM elements
const profileContainer = document.querySelector("#profile-container");
const createNewPostPage = document.querySelector("#createNewPostPage");

document.addEventListener("DOMContentLoaded", () => {


  const loginDataString = localStorage.getItem("loginData");

  const loginData = JSON.parse(loginDataString);
  const authorName = loginData.data.name;

  const AuthorEmail = loginData.data.email;
  const AuthorProfilePic = loginData.data.banner.url;
  const AuthorAvatar = loginData.data.avatar.url;

    // Render user profile in the DOM
    profileContainer.innerHTML = `
      <img id="profile-avatar" src="${AuthorAvatar}" alt="${loginData.data.avatar.alt}" />
      <img id="profile-banner" src="${AuthorProfilePic}" alt="${loginData.data.banner.alt}" />
      <div class="profile-details">
        <h3>${authorName}</h3>
        <p>${AuthorEmail}</p>
      </div>
    `;
});



document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
});

// Logout functionality

// Navigation to Manage Posts page
createNewPostPage.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/pages/create-post.html";
});


