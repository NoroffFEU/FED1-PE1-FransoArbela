import { displayError } from "../scriptComponents/displayError.js";
import { checkLogin } from "/assets/js/scriptComponents/logout.js";
checkLogin();
// getting the input fields
const title = document.querySelector("#title");
const body = document.querySelector("#body");
const img = document.querySelector("#img");
const tags = document.querySelector("#tags");
const createNewPost = document.querySelector("#create-new-post");

//
const apiLink = `https://v2.api.noroff.dev/blog/posts`;
const accessToken = localStorage.getItem("accessToken");
const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);
const authorName = loginData.data.name;

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
      const responseJSON = await response.json();
      const listOFErrors = document.querySelector("#list-of-errors");

      listOFErrors.innerHTML = "";
      displayError(responseJSON.errors, listOFErrors);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
