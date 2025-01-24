import {
  checkLogin,
  logoutAccount,
  redirectToLogin,
} from "/assets/js/auth/logout.js";

// Select DOM elements
const profileContainer = document.querySelector("#profile-container");
const createNewPostPage = document.querySelector("#createNewPostPage");

document.addEventListener("DOMContentLoaded", async (event) => {
  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");
  const loginDataString = localStorage.getItem("loginData");
  const loginData = JSON.parse(loginDataString);
  const authorName = loginData.data.name;
  const AuthorEmail = loginData.data.email;
  const AuthorProfilePic = loginData.data.banner.url;
  const AuthorAvatar = loginData.data.avatar.url;

  event.preventDefault();

  try {
    const response = await fetch(`https://v2.api.noroff.dev`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${apiKey}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch profile");

    const data = await response.json();

    // Render user profile in the DOM
    profileContainer.innerHTML = `
      <img id="profile-banner" src="${AuthorProfilePic}" alt="${loginData.data.banner.alt}" />
      <img id="profile-avatar" src="${AuthorAvatar}" alt="${loginData.data.avatar.alt}" />
      <p><strong>Name:</strong> ${authorName}</p>
      <p><strong>Email:</strong> ${AuthorEmail}</p>
    `;
  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("Failed to load profile. Please try again.");
    redirectToLogin();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
});

// Logout functionality

// Navigation to Manage Posts page
createNewPostPage.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/pages/manage-posts.html";
});
