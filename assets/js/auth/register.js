
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitButton = document.querySelector(".register");

async function registerUser(credentials) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${data.message || response.statusText}`);
    }

    return data; // Returns the login data
  } catch (error) {
    console.error("There was a problem with the login operation:", error);
    return null; 
  }
}

// Event listener for the submit button
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const credentials = {
    name: `${userName.value}`,
    email: `${email.value}`,
    password: `${password.value}`,
  };

  registerUser(credentials).then((data) => {
    if (data) {
      alert("Registration successful:", data); // Log the returned data 
    } else {
      console.log("Registration failed.");
    }
  });
});
