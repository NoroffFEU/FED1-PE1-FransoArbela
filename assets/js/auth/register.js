
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitButton = document.querySelector(".register");

// register account
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
    // 2: if we get the response, we send the it data back to the function 
    if (response.ok) {
      return data
    }
    
  } catch (error) {
    console.error("There was a problem with the registeration:", error);
    return null; 
  }
}


// submit button
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const credentials = {
    name: `${userName.value}`,
    email: `${email.value}`,
    password: `${password.value}`,
  };
// 1: get input value and send to registerUser function
  registerUser(credentials).then((data, errorCode) => {
    // 3: if data is true, alert user, if not display error
    if (data) {
      alert("Registration successful:", data);
    } else {
        const displayError = document.querySelector(".displayError")
        const errorText = document.createElement("p")
        errorText.id = "errorText"
        errorText.innerText= `Registeration unsuccesful please try again.`
        displayError.appendChild(errorText)
    }
  });
});
