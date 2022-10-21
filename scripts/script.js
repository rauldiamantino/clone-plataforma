// Script MAIN BANNER
// MENU RESPONSIVE
let buttonOpen = document.querySelector(".button-responsive");
let buttonClose = document.querySelector(".titleMenu");
let menuCategories = document.querySelector(".background-categories");

buttonOpen.addEventListener("click", function () {
  openMenu();
});

buttonClose.addEventListener("click", function () {
  closeMenu();
});

function openMenu() {
  menuCategories.classList.add("open");
}

function closeMenu() {
  menuCategories.classList.remove("open");
}