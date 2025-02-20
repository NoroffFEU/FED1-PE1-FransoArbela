import { getUsername } from "../scriptComponents/caseOfLoggedIn.js";
import { showLoadingMessage, hideLoadingMessage } from "./loading.js";

// this file shows the single post in details when they are being clicked on from blog feed

// get the id from the url
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// getting the current username based on if admin is logged in or not.
const username = getUsername();

document.addEventListener("DOMContentLoaded", async () => {
  showLoadingMessage();
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
    // case of the response is ok
    if (response.ok) {
      const blogPosts = await response.json();
      const fullBlog = document.querySelector(".single-post");

      const post = blogPosts.data;
      // Generate post
      const postElement = document.createElement("div");
      postElement.className = "full-blog-post";
      postElement.innerHTML = `
      <h1 id="blog-feed-title">${post.title}</h1>
      <h6 id="blog-feed-author">Author: ${post.author.name}</h6>

      <img src="${post.media?.url || ""}" alt="${post.media?.alt || "Image"}" />

      <p id="blog-feed-body">${post.body}</p>

      <div class="post-details">
      <p id="blog-feed-tags">Tags: ${post.tags.join(", ")}</p>
      <div id="blog-feed-dates">
        <p id="date">Published: ${new Date(
          post.created
        ).toLocaleDateString()}</p>
        <p id="date">Last updated: ${new Date(
          post.updated
        ).toLocaleDateString()}</p>
      </div>
      </div>
    `;
      fullBlog.appendChild(postElement);
      // in case the url id is empty
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
    hideLoadingMessage();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
});
