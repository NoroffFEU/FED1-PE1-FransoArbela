import { getUsername } from "./caseOfLoggedIn.js";


const searchInput = document.querySelector("#search");

// Fetch blog posts and display them in the blog feed
document.addEventListener("DOMContentLoaded", async () => {

const username = getUsername();

  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
      method: "GET",
      headers: {
        accept: "application/json",
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
          <img src="${post.media?.url || ""}" alt="${post.media?.alt || "Image"}" />
          <h3 id="blog-feed-title">${post.title}</h3>
          <p id="blog-feed-p">${post.body}</p>
          <div class="read-more-button-container">
            <button class="read-more" data-class="${post.id}">Read more...</button>
          </div>
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
          window.location.href = `/post/index.html?id=${postID}`;
        }
      });
      if (postsContainer.innerHTML === "") {
        postsContainer.innerHTML = "<p>No posts found.</p>";
      }
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

// document.getElementById("search").addEventListener("input", function () {
//   const searchText = this.value.toLowerCase();
//   const posts = document.querySelectorAll(".post-card");

//   posts.forEach((post) => {
//     const title = post.querySelector("h3").innerText.toLowerCase();
//     const body = post.querySelector("p").innerText.toLowerCase();
    
//     if (title.includes(searchText) || body.includes(searchText)) {
//       post.style.display = "block"; // Show matching posts
//     } else {
//       post.style.display = "none"; // Hide non-matching posts
//     }
//   });
// });
