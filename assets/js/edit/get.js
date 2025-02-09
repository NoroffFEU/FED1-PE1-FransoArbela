import { deletePost } from "./delete.js";

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

      const cards = document.querySelector("#cards");
      blogPosts.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-card";
        postElement.id = `${post.id}`;
        postElement.innerHTML = `
          <div>
            <img src="${post.media?.url || ""}" alt="${post.media?.alt || "Image"}" />
            <h3 id="blog-feed-title">${post.title}</h3>
            <p id="blog-feed-p">${post.body}</p>
          </div>
          <div class="button-container">
            <button class="manage-post-btn" data-class="${post.id}">Edit</button>
            <button class="delete-post-btn" data-class="${post.id}">Delete</button>
          </div>
        `;    cards.appendChild(postElement);
      });

      cards.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        const postID = target.getAttribute("data-class") || target.closest(".post-card")?.id;

        if (target.classList.contains("manage-post-btn") || target.closest(".post-card")) {
          window.location.href = `/post/edit.html?id=${postID}`;
          return;
        }

        if (target.classList.contains("delete-post-btn") && confirm("Are you sure you want to delete this post?")) {
          deletePost(postID);
          return;
        }
      });

      if (!cards.innerHTML.trim()) {
        cards.innerHTML = "<p>No posts found.</p>";
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
