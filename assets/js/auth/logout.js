// logout
const apiKey = localStorage.getItem("apiKey");
export const logoutAccount = () => {
  ["apiKey", "loginData", "accessToken"].forEach((key) =>
    localStorage.removeItem(key)
  );
  redirectToLogin()
  };
// redirect to login page
export const redirectToLogin = () => {
    window.location.href = "/account/login.html";
  };

// // checking if user logged in
export const checkLogin = () => {
    if (!apiKey) {
        window.location.href = "/account/login.html";
      }
}