
const burgerButton = document.querySelector(".burger-menu");
const offscreenMenu = document.querySelector(".offscreen-menu");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("is-active");
  offscreenMenu.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});
