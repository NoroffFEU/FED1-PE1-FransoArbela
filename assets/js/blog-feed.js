// show posts to the public
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Samal`, {
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
        <img src="${post.media?.url || ""}" alt="${
          post.media?.alt || "Image"
        }" />
           <h3>${post.title}</h3>
          <p>${post.body}</p>
          <div class="button-container">
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
