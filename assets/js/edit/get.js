

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
          <div>
            <img src="${post.media?.url || ""}" alt="${post.media?.alt || "Image"}" />
            <h3 id="blog-feed-title">${post.title}</h3>
            <p id="blog-feed-p">${post.body}</p>
          </div>
          <div class="button-container">
            <button class="manage-post-btn" data-class="${post.id}">Edit</button>
            <button class="delete-post-btn" data-class="${post.id}">Delete</button>
          </div>
        `;    postsContainer.appendChild(postElement);
      });

      postsContainer.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("manage-post-btn")) {
          const postID = event.target.getAttribute("data-class");
          window.location.href = `/post/edit.html?id=${postID}`;
          return;
        }

        if (event.target.classList.contains("delete-post-btn")) {
          const isConfirmed = confirm(
            "Are you sure you want to delete this post?"
          );
          if (isConfirmed) {
            const postID = event.target.getAttribute("data-class");
            deletePost(postID);
            return;
          }
        }
        if (event.target.closest(".post-card")) {
          const postID = event.target.closest(".post-card").id;
          window.location.href = `/post/edit.html?id=${postID}`;
          return;
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
