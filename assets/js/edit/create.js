const title = document.querySelector("#create-new-post-title");
const body = document.querySelector("#create-new-post-body");
const img = document.querySelector("#create-new-post-img");
const tags = document.querySelector("#create-new-post-tag");
const createNewPost = document.querySelector("#create-new-post");

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
    tags: [tags.value],
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
      const errorTitle = document.querySelector("#title-error")
      const errorImg = document.querySelector("#img-error")
      const responseText = await response.json();
      responseText.errors.forEach((error) => {
        console.log(error.message);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
