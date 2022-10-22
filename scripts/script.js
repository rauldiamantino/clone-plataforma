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

// PAGE PRODUCT - CHANGE IMAGE
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

// PAGE PRODUCT - IMPORT DATA
let products = document.querySelectorAll(".product");
let modal = document.querySelector("dialog");
let nameProduct = document.querySelector("#prod-name");
let priceProduct = document.querySelector("#prod-price");

products.forEach(selectProduct);

function selectProduct(prod) {
  prod.addEventListener("click", function (event) {
    let prodName = prod.dataset.prodname;
    let prodPrice = prod.dataset.prodprice;
    modal.showModal();
    nameProduct.textContent = prodName;
    priceProduct.textContent = prodPrice;
  });
}
