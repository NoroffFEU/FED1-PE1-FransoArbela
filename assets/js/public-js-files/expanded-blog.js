import { getUsername } from "./caseOfLoggedIn.js";
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
      const fullBlog = document.querySelector(".expanded-post-container");

      const post = blogPosts.data;
      // Generate post
      const postElement = document.createElement("div");
      postElement.className = "full-blog-post";
    postElement.innerHTML = `
      <h1 id="blog-feed-title">${post.title}</h1>
      <p id="blog-feed-author">Author: ${post.author.name}</p>
      <div id="blog-feed-dates">
        <p>Published: ${new Date(post.created).toLocaleDateString()}</p>
        <p>Last updated: ${new Date(post.updated).toLocaleDateString()}</p>
      </div>
      <img src="${post.media?.url || ""}" alt="${post.media?.alt || "Image"}" />
      <p id="blog-feed-body">${post.body}</p>
      <p id="blog-feed-tags">Tags: ${post.tags.join(", ")}</p>
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
