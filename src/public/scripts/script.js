/* - GET BUTTONS 
-------------------------------------------------------------------------*/

const $buttons = document.querySelectorAll("button");

const clickedButton = button => {
     button.addEventListener("click", event => {
          closeModal(button);
          openResponsiveMenu(button);
          verifyBannerCarouselButton(button);
          verifyCarouselButton(button);
          currentImageManipulation(button);
     });
};

$buttons.forEach(clickedButton);

/* - CHANGE MANUAL AND AUTO ROTATE BANNER
-------------------------------------------------------------------------*/

let $banners = document.querySelectorAll(".item");
let currentBanner = 0;

const changeBanner = (currentBanner, $classCarousel) => {
     const $mainBanner = document.querySelector(`.${$classCarousel}`);
     const styleTranslate = `translateX(${-currentBanner * 100}%)`;

     // verify if $mainBanner exists in the page, and set style transform
     if ($mainBanner) $mainBanner.style.transform = styleTranslate;
};

const verifyBannerCarouselButton = button => {
     const isLeft = button.classList.contains("left-btn");
     const isRight = button.classList.contains("right-btn");
     const $classCarousel = button.parentNode.lastElementChild.lastElementChild.className;

     if (isLeft || isRight) {
          $banners = document.querySelectorAll(`.${$classCarousel} .item`);
          const maxBanners = $banners.length;

          currentBannerManipulation(isLeft, isRight, maxBanners, $classCarousel);
     }
};

const currentBannerManipulation = (isLeft, isRight, maxBanners, $classCarousel) => {
     /* manipulation current banner */
     if (isLeft) currentBanner--;
     if (isRight) currentBanner++;
     if (currentBanner >= maxBanners) currentBanner = 0;
     if (currentBanner < 0) currentBanner = maxBanners - 1;

     /* call the function to change the banner */
     changeBanner(currentBanner, $classCarousel);
};

/* - CHANGE MAIN BANNER AUTOMATICALLY
-------------------------------------------------------------------------*/

let intervalForChangingBanner;

const changeBannerAuto = () => {
     intervalForChangingBanner = setInterval(() => {
          nextBanner();
     }, 500);

     return intervalForChangingBanner;
};

const nextBanner = () => {
     $buttons.forEach(button => {
          if (button.classList.contains("right-btn")) verifyBannerCarouselButton(button);
     });
};

const stopBannerAuto = () => clearInterval(intervalForChangingBanner);

const stopIfTheMouseEnters = () => {
     const $mainBanner = document.querySelector(".containerMainBanner");

     // If the mouse enters, so stop the banner change. If the mouse leaves, so return the banner change
     // Verify too, if the $mainBanner exists in the current page
     if ($mainBanner) $mainBanner.addEventListener("mouseover", () => stopBannerAuto());
     if ($mainBanner) $mainBanner.addEventListener("mouseout", () => changeBannerAuto());
};

/* Call the functions for the start and stop banner rotation */
// changeBannerAuto();
// stopIfTheMouseEnters();

/* - PRODUCT LINE CAROUSEL
-------------------------------------------------------------------------*/
let $prodCarousel;
let $allProductsCarousel = document.querySelectorAll("#products-line .product");
let counter = 0;

const verifyCarouselButton = button => {
     const isLeft = button.classList.contains("left-btn");
     const isRight = button.classList.contains("right-btn");
     const $classCarousel = button.parentNode.lastElementChild.lastElementChild.className;
     const $currentCarousel = document.querySelector(`.${$classCarousel}`);

     if ($currentCarousel.parentNode.className) {
          if (isLeft || isRight) {
               $allProductsCarousel = document.querySelectorAll(`.${$classCarousel} .product`);
               $prodCarousel = $currentCarousel;

               manipulationCounterCarousel(isLeft, isRight);
          }
     }
};

const manipulationCounterCarousel = (btnLeft, btnRight) => {
     if (btnLeft) counter--;
     if (btnRight) counter++;
     if (counter <= 0) counter = 0;
     if (counter >= counterLimiter()) counter = counterLimiter();

     $prodCarousel.style.transform = styleTranslateDefinition(counter);
};

const styleTranslateDefinition = counter => `translateX(${-counter * 100}%)`;

/* call the function if resize the screen */
document.body.onresize = () => {
     if (document.body.clientWidth > 900) manipulationCounterCarousel((counter = 0));
};

const counterLimiter = () => limiter(carouselXProductsPixels());

const limiter = carouselXProductsPixels => {
     // verify if $prodCarousel exists in the page, and get width
     const widthCarousel = $prodCarousel ? $prodCarousel.offsetWidth : false;
     const result = carouselXProductsPixels / widthCarousel - 1;
     return roundResult(result);
};

const roundResult = number => number.toFixed(0);

const carouselXProductsPixels = () => {
     // verify if $allProductsCarousel exists in the page, and get width
     const widthProducts = $allProductsCarousel[0] ? $allProductsCarousel[0].offsetWidth : false;
     const result = $allProductsCarousel.length * widthProducts;

     return result;
};

/* - MENU RESPONSIVE
-------------------------------------------------------------------------*/

const openResponsiveMenu = button => {
     const isRespButtonToOpen = button.classList.contains("button-responsive");
     const categoriesMenu = document.querySelector(".background-categories");

     if (isRespButtonToOpen) {
          categoriesMenu.classList.add("menu-categories-open");
          categoriesMenu.classList.remove("menu-categories-close");
     } else {
          closeRespMenu(button, categoriesMenu);
     }
};

const closeRespMenu = (button, categoriesMenu) => {
     const isRespButtonToClose = button.classList.contains("button-responsive-close");

     if (isRespButtonToClose) {
          categoriesMenu.classList.add("menu-categories-close");
          categoriesMenu.classList.remove("menu-categories-open");
     }
};

const $menuCategorieItems = document.querySelectorAll(".inactivate-link");

$menuCategorieItems.forEach($item => {
     $item.addEventListener("click", () => {
          openSubcategories($item.parentNode.lastElementChild);
          $item.remove();
     });
});

const openSubcategories = $item => {
     $item.classList.remove("hidden");
};

/* - GET PRODUCTS, AND MODAL WITH THE PRODUCT PAGE
-------------------------------------------------------------------------*/

const $products = document.querySelectorAll(".product");
const clickedProduct = $product => $product.addEventListener("click", () => openModal($product));

$products.forEach(clickedProduct);

/* - MODAL
I am learning and using datalists to get the products data, so the code is still too bad.
-------------------------------------------------------------------------*/

const removeBackgroundScroll = () => (document.documentElement.style.overflow = "hidden");
const addBackgroundScroll = () => (document.documentElement.style.overflow = "inherit");

const openModal = $product => {
     const $modalProduct = document.querySelector(".background-modal-product");
     const $productImgs = $product.querySelectorAll(".product-source-img");

     $modalProduct.style.display = "flex";
     removeBackgroundScroll();
     closeModalEscKey($modalProduct);
     setProductTexts($product.dataset);
     setProductImages($productImgs);
};

const setProductTexts = $product => {
     const $productName = document.querySelector("#prod-name");
     const $productPrice = document.querySelector("#prod-price");
     const $productDescription = document.querySelector(".prod-description");

     $productName.innerText = $product.prodname;
     $productPrice.innerText = $product.prodprice;
     $productDescription.innerText = $product.proddesc;

     // Page scroll to top, when product is clicked
     $productName.scrollIntoView(0);
};

/* - MODAL - IMAGES OF THE PRODUCTS
-------------------------------------------------------------------------*/
const $productImages = document.querySelectorAll(".product-images > img");
let currentImageProduct = 0;

/* get images in the data-set and set in the product modal */
const setProductImages = $productImgs => {
     removeCurrentImages();
     appendProductImg($productImgs);
     setMainImage();
};

const appendProductImg = $productImgs => {
     const $secondaryImagesBox = document.querySelector(".secondary-images");

     $productImgs.forEach($img => {
          const $productImgUrl = $img.dataset.img;
          const htmlProductImg = `<div class="box-small-image"><img src="${$productImgUrl}" class="product-img"></div>`;

          $secondaryImagesBox.innerHTML += htmlProductImg;
     });
};

/* verify secondary image and set as main image */
const setMainImage = () => {
     const $secondaryImages = document.querySelectorAll(".product-img");
     const secondaryImagesLength = $secondaryImages.length - 1;

     if ($mainProductImage.childNodes.length == 0) {
          $secondaryImages.forEach((image, index) => {
               setMainProductImages(image.src);
               currentImageProduct = 0;
               changeProductImage();

               image.addEventListener("click", () => {
                    currentImageProduct = index;
                    changeProductImage();
               });
          });
     }

     return secondaryImagesLength;
};

const setMainProductImages = image => {
     const productImage = document.createElement("img");
     productImage.src = image;

     $mainProductImage.appendChild(productImage);
};

const removeCurrentImages = () => {
     const $secondaryImagesBox = document.querySelector(".secondary-images");

     $secondaryImagesBox.innerHTML = "";
     $mainProductImage.innerHTML = "";
};

const currentImageManipulation = button => {
     const isLeft = button.classList.contains("btnModal-left");
     const isRight = button.classList.contains("btnModal-right");
     const maxImages = setMainImage();

     /* manipulation current image */
     if (isLeft) currentImageProduct--;
     if (isRight) currentImageProduct++;
     if (currentImageProduct >= maxImages) currentImageProduct = maxImages;
     if (currentImageProduct < 0) currentImageProduct = 0;

     /* call the function to change the image */
     changeProductImage();
};

/* - CHANGE PRODUCT IMAGE
-------------------------------------------------------------------------*/
var $mainProductImage = document.querySelector(".product-images");

const changeProductImage = () => {
     const maxImages = setMainImage();

     if (currentImageProduct >= maxImages) currentImageProduct = maxImages;
     if (currentImageProduct < 0) currentImageProduct = 0;
     const styleTranslateDefinition = `translateX(${-currentImageProduct * 100}%)`;

     // verify if $mainBanner exists in the page, and set style transform
     if ($mainProductImage) $mainProductImage.style.transform = styleTranslateDefinition;
};

const closeModalEscKey = $modalProduct => {
     document.addEventListener("keydown", e => {
          if (e.key === "Escape") {
               $modalProduct.style.display = "none";
          }
          addBackgroundScroll();
     });
};

const closeModal = button => {
     const $modalProduct = document.querySelector(".background-modal-product");
     const isCloseModal = button.classList.contains("btn-close-modal");

     if (isCloseModal) ($modalProduct.style.display = "none"), addBackgroundScroll();
};

/* - CATEGORIES NAVBAR
-------------------------------------------------------------------------*/

const categoriesMenu = document.querySelectorAll(".categories-a");
categoriesMenu.forEach(categorie => {
     categorie.addEventListener("click", () => {
          return false;
     });
});
