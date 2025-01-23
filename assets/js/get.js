import {
  checkLogin,
  logoutAccount,
  redirectToLogin,
} from "/assets/js/auth/logout.js";
const logout = document.querySelector(".logout");

/////////////////////////////////////////////////////////////////////   get posts
document.addEventListener("DOMContentLoaded", async () => {
  const loginDataString = localStorage.getItem("loginData");
  const loginData = JSON.parse(loginDataString);
  const authorName = loginData.data.name;
  const apiLink = `https://v2.api.noroff.dev/blog/posts`;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${apiLink}/${authorName}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const blogPosts = await response.json();

      const postsContainer = document.querySelector("#postsContainer");

      // Generate posts
      blogPosts.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-card";
        postElement.id = `${post.id}`;
        postElement.innerHTML = `
                <h3 id="blog-feed-title">${post.title}</h3>
                <img src="${post.media?.url || ""}" alt="${
          post.media?.alt || "Image"
        }" />
         <p id="blog-feed-p">${post.body}</p>
         <div class="button-container">
         <button class="manage-post-btn" data-class="${
                  post.id
                }">Manage</button>          </div>
            `;

        postsContainer.appendChild(postElement);
      });

      postsContainer.addEventListener("click", (event) => {
        // Handle button clicks
        if (event.target.classList.contains("manage-post-btn")) {
          const postID = event.target.getAttribute("data-class");
          window.location.href = `/post/edit.html?id=${postID}`;
          return;
        }

        // Handle .post-card clicks
        const postCard = event.target.closest(".post-card");
        if (postCard) {
          const postID = postCard.id;
          window.location.href = `/post/edit.html?id=${postID}`;
        }
      });
    } else {
      console.error(
        "Failed to fetch blog posts:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
});

// Logout functionality
logout.addEventListener("click", () => {
  logoutAccount();
  redirectToLogin();
});
