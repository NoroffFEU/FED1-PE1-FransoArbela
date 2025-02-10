const profileContainer = document.querySelector("#profile-container");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submit = document.querySelector(".login");
const alreadyloggedIn = document.querySelector(".alreadylogged-in");

// local storage
const apiKey = localStorage.getItem("apiKey");
const accessToken = localStorage.getItem("accessToken");

// check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey && accessToken) {
    window.location.href = "/pages/profile.html";
  }
});

submit.addEventListener("click", (event) => {
  event.preventDefault();

  const loginAndUseToken = async () => {
    const loginUrl = "https://v2.api.noroff.dev/auth/login";
    const apiKeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";

    const loginPayload = {
      email: `${emailInput.value}`,
      password: `${passwordInput.value}`,
    };

    try {
      // Step 1: Log in and get the token
      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed: " + (await loginResponse.text()));
      }


      const loginData = await loginResponse.json();
      const loginDataString = JSON.stringify(loginData);
      console.log(loginData)

      // push to local storage
      localStorage.setItem("loginData", loginDataString);

      const token = loginData.data.accessToken;
      localStorage.setItem("accessToken", token);
      const autherName = loginData.data.name;

      // Step 2: Use the token to authenticate second request
      const apiKeyPayload = {
        data: {
          name: `${autherName}`,
          key: `${apiKey}`,
        },
        meta: {},
      };

      const apiKeyResponse = await fetch(apiKeyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiKeyPayload),
      });

      // window.location.href = "/pages/profile.html";
      if (!apiKeyResponse.ok) {
        throw new Error(
          "API Key creation failed: " + (await apiKeyResponse.text())
        );
      }
      const apiKeyData = await apiKeyResponse.json();
      localStorage.setItem("apiKey", apiKeyData.data.key);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  loginAndUseToken();
});
