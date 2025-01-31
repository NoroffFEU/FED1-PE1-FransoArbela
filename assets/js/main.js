const burgerBtn = document.querySelector(".burger-menu");
const offscreenMenu = document.querySelector(".offscreen-menu");

burgerBtn.addEventListener("click", ()=>{
    burgerBtn.classList.toggle('is-active')
    offscreenMenu.classList.toggle('active')
})