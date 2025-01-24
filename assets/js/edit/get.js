import {
  checkLogin,
  logoutAccount,
  redirectToLogin,
} from "/assets/js/auth/logout.js";
import { deletePost } from "/assets/js/edit/delete.js";
// Query selectors
const logout = document.querySelector(".logout");

//


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
      
          blogPosts.data.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "post-card";
            postElement.id = `${post.id}`;
            postElement.innerHTML = `
            <img src="${post.media?.url || ""}" alt="${
              post.media?.alt || "Image"
            }" />
               <h3 id="blog-feed-title" >${post.title}</h3>
              <p id="blog-feed-p">${post.body}</p>
              <div class="button-container">
              <button class="manage-post-btn" data-class="${post.id}">Edit</button>
              <button class="delete-post-btn" data-class="${post.id}">Delete</button>
              </div>
        `;
            postsContainer.appendChild(postElement);
          });

            postsContainer.addEventListener("click", (event) => {
              if (event.target.classList.contains("manage-post-btn")) {
                const postID = event.target.getAttribute("data-class");
                window.location.href = `/post/edit.html?id=${postID}`;
                return;
              }
              if (event.target.classList.contains("delete-post-btn")) {
                const postID = event.target.getAttribute("data-class");
                deletePost(postID);
                return;
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

