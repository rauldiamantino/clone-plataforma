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

// let products = document.querySelectorAll(".product");
// let modal = document.querySelector("dialog");
// let nameProduct = document.querySelector("#prod-name");
// let priceProduct = document.querySelector("#prod-price");
// let btnCloseModal = document.querySelector("#btn-close-modal");

// products.forEach(getProduct);

// function getProduct(prod) {
//      prod.addEventListener("click", function (event) {
//           modal.showModal();
//           nameProduct.textContent = prod.dataset.prodname;
//           priceProduct.textContent = prod.dataset.prodprice;
//      });
// }

// btnCloseModal.addEventListener("click", () => {
//      modal.close();
// });
