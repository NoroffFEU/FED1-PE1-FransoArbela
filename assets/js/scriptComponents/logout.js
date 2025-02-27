// logout
const accessToken = localStorage.getItem("accessToken");
// clears the localStorage
export const logoutAccount = () => {
  ["loginData", "accessToken"].forEach((key) =>
    localStorage.removeItem(key)
  );
  redirectToLogin()
  };

// redirect to login page
export const redirectToLogin = () => {
    window.location.href = "/account/login.html";
  };

// checking if user logged in
export const checkLogin = () => {
    if (!accessToken) {
        window.location.href = "/account/login.html";
      }
}