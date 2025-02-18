const burgerBtn = document.querySelector(".burger-menu");
const offscreenMenu = document.querySelector(".offscreen-menu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("is-active");
  offscreenMenu.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  const mainElement = document.querySelector('main');
  const loadingScreen = document.createElement("div")
  loadingScreen.id = "loading-screen"
  mainElement.appendChild(loadingScreen)
  console.log(loadingScreen)
});
