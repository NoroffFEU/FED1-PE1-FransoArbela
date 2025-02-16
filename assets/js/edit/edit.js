const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// Query selectors
const title = document.querySelector("#title");
const body = document.querySelector("#body");
const img = document.querySelector("#img");
const tags = document.querySelector("#tags");
const edit = document.querySelector("#edit");

// define the API
const apiLink = `https://v2.api.noroff.dev/blog/posts`;
const accessToken = localStorage.getItem("accessToken");
const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);
const authorName = loginData.data.name;
const blogPostUrl = `${apiLink}/${authorName}`;

edit.addEventListener("click", async (event) => {
  event.preventDefault();

  // Validation for empty fields
  if (!title.value || !img.value) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Prepare the data payload
  const data = {
    title: title.value,
    body: body.value,
    tags: [tags.value],
    media: {
      url: img.value,
      alt: "",
    },
  };

  try {
    // API request to update the blog post
    const response = await fetch(`${blogPostUrl}/${postId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Blog post edited successfully.");
      window.location.href = "/pages/profile.html"; // Redirect to posts page
    } else {
      console.error(
        "Failed to edit the blog post:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// fetch the input values of the blog post

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`${apiLink}/${authorName}/${postId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (response.ok) {
      const blogPost = await response.json();
      title.value = blogPost.data.title;
      body.value = blogPost.data.body;
      img.value = blogPost.data.media.url;
      tags.value = blogPost.data.tags;
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
