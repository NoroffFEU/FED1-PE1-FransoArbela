import { getUsername } from "../scriptComponents/caseOfLoggedIn.js";
// get link later
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const username = getUsername();

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${username}/${postId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const blogPosts = await response.json();
      const fullBlog = document.querySelector(".single-post");

      const post = blogPosts.data;
      // Generate post
      const postElement = document.createElement("div");
      postElement.className = "full-blog-post";
      postElement.innerHTML = `
      <h1 id="blog-feed-title">${post.title}</h1>
      <h5 id="blog-feed-author">Author: ${post.author.name}</h5>

      <img src="${post.media?.url || ""}" alt="${post.media?.alt || "Image"}" />

      <p id="blog-feed-body">${post.body}</p>

      <div class="post-details">
      <h5 id="blog-feed-tags">Tags: ${post.tags.join(", ")}</h5>
      <div id="blog-feed-dates">
        <h5 id="date">Published: ${new Date(post.created).toLocaleDateString()}</h5>
        <h5 id="date">Last updated: ${new Date(post.updated).toLocaleDateString()}</h5>
      </div>
      </div>
    `;
      fullBlog.appendChild(postElement);

      if (postId === "") {
        fullBlog.innerHTML = "<p>No posts found.</p>";
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
