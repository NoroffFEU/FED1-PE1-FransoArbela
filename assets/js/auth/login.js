import { displayError } from "../scriptComponents/displayError.js";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submit = document.querySelector(".login");


// check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey && accessToken) {
    window.location.href = "/pages/profile.html";
  }
});

// submit button to log in
submit.addEventListener("click", (event) => {
  event.preventDefault();

  const loginAndUseToken = async () => {
    const loginUrl = "https://v2.api.noroff.dev/auth/login";

    const loginInput = {
      email: `${emailInput.value}`,
      password: `${passwordInput.value}`,
    };

    try {
      //Log in and get the token
      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(loginInput),
      });

      const loginData = await loginResponse.json();
      if (loginResponse.ok) {
        const loginDataString = JSON.stringify(loginData);

        // push to local storage
        localStorage.setItem("loginData", loginDataString);
        const token = loginData.data.accessToken;
        localStorage.setItem("accessToken", token);
        // redirect to profile page
        window.location.href = "/pages/profile.html";
      } else {
        
        const listOFErrors = document.querySelector("#list-of-errors");

        const errorMessages = loginData.errors;
  
        listOFErrors.innerHTML = "";
  
        displayError(errorMessages, listOFErrors)
      }
    } catch (error) {
      console.error(error)
    }
  };

  loginAndUseToken();
});
