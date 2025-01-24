const loginDataString = localStorage.getItem("loginData");
const loginData = JSON.parse(loginDataString);

document.addEventListener('DOMContentLoaded', () => {
if (loginData) {
    const authorName = loginData.data.name;
    const nav = document.querySelector('nav');
    const logoutButton = document.createElement('button');
    logoutButton.className = 'logout';
    logoutButton.textContent = 'log out';
    
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.innerHTML = `${authorName}`;
    loginBtn.id = 'profileBtn';
    loginBtn.href = '/pages/profile.html';
    nav.appendChild(logoutButton);
}
})