/* - GET BUTTONS 
-------------------------------------------------------------------------*/

const $buttons = document.querySelectorAll("button");

const clickedButton = button => {
     button.addEventListener("click", () => {
          closeModal(button);
          openResponsiveMenu(button);
          currentBannerManipulation(button);
          verifyCarouselButton(button, "left-btn-prod", "right-btn-prod");
          currentImageManipulation(button);
     });
};

$buttons.forEach(clickedButton);

/* - CHANGE MANUAL AND AUTO ROTATE BANNER
-------------------------------------------------------------------------*/

const $banners = document.querySelectorAll(".item");
let currentBanner = 0;

const changeBanner = currentBanner => {
     const $mainBanner = document.querySelector("#main-banner");
     const styleTranslateDefinition = `translateX(${-currentBanner * 100}%)`;

     // verify if $mainBanner exists in the page, and set style transform
     if ($mainBanner) $mainBanner.style.transform = styleTranslateDefinition;
};

/* - CALL THE FUNCTION TO CHANGE THE BANNER
-------------------------------------------------------------------------*/

const currentBannerManipulation = button => {
     const isLeft = button.classList.contains("btnLeft-m-banner");
     const isRight = button.classList.contains("btnRight-m-banner");
     const maxBanners = $banners.length;

     /* manipulation current banner */
     if (isLeft) currentBanner--;
     if (isRight) currentBanner++;
     if (currentBanner >= maxBanners) currentBanner = 0;
     if (currentBanner < 0) currentBanner = maxBanners - 1;

     /* call the function to change the banner */
     changeBanner(currentBanner);
};

/* - CHANGE MAIN BANNER AUTOMATICALLY
-------------------------------------------------------------------------*/

let intervalForChangingBanner;

const changeBannerAuto = () => {
     intervalForChangingBanner = setInterval(() => {
          nextBanner();
     }, 5000);

     return intervalForChangingBanner;
};

const nextBanner = () => {
     $buttons.forEach(button => {
          if (button.classList.contains("btnRight-m-banner")) currentBannerManipulation(button);
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
changeBannerAuto();
stopIfTheMouseEnters();

/* - PRODUCT LINE CAROUSEL
-------------------------------------------------------------------------*/

const $prodCarousel = document.querySelector("#products-line");
const $allProductsCarousel = document.querySelectorAll("#products-line .product");
let counter = 0;

const verifyCarouselButton = (button, leftClass, rightClass) => {
     const isLeft = button.classList.contains(leftClass);
     const isRight = button.classList.contains(rightClass);

     manipulationCounterCarousel(isLeft, isRight);
};

const manipulationCounterCarousel = (btnLeft, btnRight) => {
     if (btnLeft) counter--;
     if (btnRight) counter++;
     if (counter <= 0) counter = 0;
     if (counter >= counterLimiter()) counter = counterLimiter();

     if ($prodCarousel) $prodCarousel.style.transform = styleTranslateDefinition(counter);
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

     isRespButtonToOpen ? categoriesMenu.classList.add("open") : closeRespMenu(button, categoriesMenu);
};

const closeRespMenu = (button, categoriesMenu) => {
     const isRespButtonToClose = button.classList.contains("button-responsive-close");

     if (isRespButtonToClose) categoriesMenu.classList.remove("open");
};

/* - GET PRODUCTS, AND MODAL WITH THE PRODUCT PAGE
-------------------------------------------------------------------------*/

const $products = document.querySelectorAll(".product");
const clickedProduct = product => product.addEventListener("click", () => openModal(product));

$products.forEach(clickedProduct);

/* - MODAL
-------------------------------------------------------------------------*/

const removeBackgroundScroll = () => (document.documentElement.style.overflow = "hidden");
const addBackgroundScroll = () => (document.documentElement.style.overflow = "inherit");

const openModal = product => {
     const $modalProduct = document.querySelector(".background-modal-product");

     $modalProduct.style.display = "flex";
     removeBackgroundScroll();
     closeModalEscKey($modalProduct);
     setProductData(product.dataset);
};

const setProductData = product => {
     const $productName = document.querySelector("#prod-name");
     const $productPrice = document.querySelector("#prod-price");
     const $productDescription = document.querySelector(".prod-description");
     const $secondaryImagesBox = document.querySelector(".secondary-images");
     const boxSmallImage1 = document.createElement("div");
     const boxSmallImage2 = document.createElement("div");
     const productImg1 = document.createElement("img");
     const productImg2 = document.createElement("img");

     // delet previous images
     removeCurrentImages();

     // set secondary images
     productImg1.src = product.img1;
     productImg2.src = product.img2;
     $secondaryImagesBox.innerHTML = "";
     productImg1.classList.add("product-img");
     productImg2.classList.add("product-img");
     boxSmallImage1.appendChild(productImg1);
     boxSmallImage2.appendChild(productImg2);
     boxSmallImage1.classList.add("box-small-image");
     boxSmallImage2.classList.add("box-small-image");
     $secondaryImagesBox.appendChild(boxSmallImage1);
     $secondaryImagesBox.appendChild(boxSmallImage2);

     // set product texts
     $productName.innerText = product.prodname;
     $productPrice.innerText = product.prodprice;
     $productDescription.innerText = product.proddesc;

     // Page scroll to top, when product is clicked
     $productName.scrollIntoView(0);

     // set secondary images as main image
     setMainImage();
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

/* - MODAL - IMAGES OF THE PRODUCTS
-------------------------------------------------------------------------*/
const $productImages = document.querySelectorAll(".product-images > img");

const currentImageManipulation = button => {
     const isLeft = button.classList.contains("btnModal-left");
     const isRight = button.classList.contains("btnModal-right");
     const maxImages = setMainImage();
     let currentImage = 0;

     /* manipulation current image */
     if (isLeft) currentImage--;
     if (isRight) currentImage++;
     if (currentImage >= maxImages) currentImage = maxImages;
     if (currentImage < 0) currentImage = 0;

     /* call the function to change the image */
     changeProductImage(currentImage);
};

/* - CHANGE PRODUCT IMAGE
-------------------------------------------------------------------------*/
var $mainProductImage = document.querySelector(".product-images");

const changeProductImage = currentImage => {
     const maxImages = setMainImage();

     if (currentImage >= maxImages) currentImage = maxImages;
     if (currentImage < 0) currentImage = 0;
     const styleTranslateDefinition = `translateX(${-currentImage * 100}%)`;

     // verify if $mainBanner exists in the page, and set style transform
     if ($mainProductImage) $mainProductImage.style.transform = styleTranslateDefinition;
};

/* verify secondary image and set as main image */

const setMainImage = () => {
     const $secondaryImages = document.querySelectorAll(".product-img");
     const secondaryImagesLength = $secondaryImages.length - 1;
     if ($mainProductImage.childNodes.length == 0) {
          $secondaryImages.forEach((image, index) => {
               setMainProductImages(image.src);

               image.addEventListener("click", () => {
                    currentImage = index;
                    changeProductImage(currentImage);
               });
          });
          return secondaryImagesLength;
     }
};

const setMainProductImages = image => {
     const productImage = document.createElement("img");
     productImage.src = image;

     $mainProductImage.appendChild(productImage);
};

const removeCurrentImages = () => {
     $mainProductImage.innerHTML = "";
};

/* - CATEGORIES NAVBAR
-------------------------------------------------------------------------*/

const categoriesMenu = document.querySelectorAll(".categories-a");
console.log(categoriesMenu);
categoriesMenu.forEach(categorie => {
     categorie.addEventListener("click", () => {
          return false;
     });
});
