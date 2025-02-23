import { displayError } from "../scriptComponents/displayError.js";

// getting the input fields
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitButton = document.querySelector(".register");

// submit button to register
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const registerUser = async () => {
    const registerInput = {
      name: `${userName.value}`,
      email: `${email.value}`,
      password: `${password.value}`,
    };

    try {
      const response = await fetch(`https://v2.api.noroff.dev/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInput),
      });

      const registerData = await response.json();
      if (response.ok) {
         alert("User registered successfully!");

         // push to local storage
        const registerDataString = JSON.stringify(registerData);
        localStorage.setItem("loginData", registerDataString);
        const token = registerData.data.accessToken;
        localStorage.setItem("accessToken", token);
        // redirect to profile page
        window.location.href = "/pages/profile.html";
      } else {
        
        const listOFErrors = document.querySelector("#list-of-errors");
        const errorMessages = registerData.errors;
        listOFErrors.innerHTML = "";
        displayError(errorMessages, listOFErrors)
      }
    } catch (error) {
      console.error("Network error:", error);
      return console.log(error);
    }
  };
  registerUser();
});
