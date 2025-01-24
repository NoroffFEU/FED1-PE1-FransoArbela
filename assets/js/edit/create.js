

const title = document.querySelector("#title");
const body = document.querySelector("#body");
const img = document.querySelector("#img");
const createNewPost = document.querySelector("#createNewPost");


// 
const apiLink = `https://v2.api.noroff.dev/blog/posts`;
const accessToken = localStorage.getItem("accessToken");
const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);
const authorName = loginData.data.name;
const blogPostUrl = `${apiLink}/${authorName}`;


createNewPost.addEventListener("click", async (event) => {
  event.preventDefault();

  // Prepare post data
  const data = {
    title: title.value,
    body: body.value,
    tags: ["example", "blog", "API"],
    media: {
      url: img.value,
      alt: "An example image",
    },
  };

  try {
    const response = await fetch(`${apiLink}/${authorName}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {

      alert("New Post Created");
      window.location.href = "/pages/profile.html"; // Redirect to posts page
    } else {
      console.error(
        "Failed to create blog post:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
});