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

// PAGE PRODUCT
let mainImage = document.querySelector(".main-image > img");
let secondaryImages = document.querySelectorAll(".product-img");

secondaryImages.forEach(selectImage);

function selectImage(img) {
  img.addEventListener("click", function (event) {
    setMainImage(event.target.src);
  });
}

function setMainImage(img) {
  mainImage.setAttribute("src", img);
}
