/* GET BUTTONS */
const $buttons = document.querySelectorAll("button");

const clickedButton = button => {
     button.addEventListener("click", () => {
          currentBannerManipulation(button);
          openResponsiveMenu(button);
          closeModal(button);
          verifyCarouselButton(button);
     });
};

$buttons.forEach(clickedButton);

/* CHANGE MANUAL AND AUTO ROTATE BANNER */
const $banners = document.querySelectorAll(".item");
let currentBanner = 0;

const changeBanner = currentBanner => {
     const $mainBanner = document.querySelector("#main-banner");
     const styleTranslateDefinition = `translateX(${-currentBanner * 100}%)`;

     // verify if $mainBanner exists in the page, and set style transform
     $mainBanner ? ($mainBanner.style.transform = styleTranslateDefinition) : false;
};

const changeBannerAuto = () => {
     $buttons.forEach(button => {
          const isLeft = button;
          if (isLeft.classList.contains("btnLeft-m-banner")) {
               setInterval(function () {
                    currentBannerManipulation(isLeft);
               }, 5000);
          }
     });
};

changeBannerAuto();

/* CALL THE FUNCTION TO CHANGE THE BANNER */
const currentBannerManipulation = button => {
     const isLeft = button.classList.contains("btnLeft-m-banner");
     const isRight = button.classList.contains("btnRight-m-banner");
     const maxBanners = $banners.length;

     /* manipulation current banner */
     if (isLeft) {
          currentBanner -= 1;
     }
     if (isRight) {
          currentBanner += 1;
     }

     currentBanner >= maxBanners ? (currentBanner = 0) : false;
     currentBanner < 0 ? (currentBanner = maxBanners - 1) : false;

     /* call the function to change the banner */
     changeBanner(currentBanner);
};

/* PRODUCT LINE CAROUSEL*/
const $prodCarousel = document.querySelector("#products-line");
const $allProductsCarousel = document.querySelectorAll("#products-line .product");
let counter = 0;

const verifyCarouselButton = button => {
     const isLeft = button.classList.contains("left-btn-prod");
     const isRight = button.classList.contains("right-btn-prod");

     manipulationCounterCarousel(isLeft, isRight);
};

const manipulationCounterCarousel = (btnLeft, btnRight) => {
     if (btnLeft) counter--;
     if (btnRight) counter++;
     if (counter <= 0) counter = 0;
     if (counter >= counterLimiter()) counter = counterLimiter();

     $prodCarousel.style.transform = styleTranslateDefinition(counter);
};

/* CALL THE FUNCTION IF RESIZE THE SCREEN */
document.body.onresize = () => {
     if (document.body.clientWidth > 900) manipulationCounterCarousel((counter = 0));
};

const styleTranslateDefinition = counter => `translateX(${-counter * 100}%)`;

const counterLimiter = () => {
     return limiter(carouselXProductsPixels());
};

const limiter = carouselXProductsPixels => {
     // verify if $prodCarousel exists in the page, and get width
     const widthCarousel = $prodCarousel ? $prodCarousel.offsetWidth : false;
     const result = carouselXProductsPixels / widthCarousel - 1;
     return roundResult(result);
};

const roundResult = number => number.toFixed(0);

const carouselXProductsPixels = () => {
     const widthProducts = $allProductsCarousel[0].offsetWidth;
     const result = $allProductsCarousel.length * widthProducts;

     return result;
};

/* MENU RESPONSIVE */
const openResponsiveMenu = button => {
     const isRespButtonToOpen = button.classList.contains("button-responsive");
     const categoriesMenu = document.querySelector(".background-categories");

     isRespButtonToOpen ? categoriesMenu.classList.add("open") : closeRespMenu(button, categoriesMenu);
};

const closeRespMenu = (button, categoriesMenu) => {
     const isRespButtonToClose = button.classList.contains("button-responsive-close");

     isRespButtonToClose ? categoriesMenu.classList.remove("open") : false;
};

/* GET PRODUCTS, AND MODAL WITH THE PRODUCT PAGE*/
const $products = document.querySelectorAll(".product");
const clickedProduct = product => product.addEventListener("click", () => openModal(product));

$products.forEach(clickedProduct);

/* MODAL */
const removeBackgroundScroll = () => (document.documentElement.style.overflow = "hidden");
const addBackgroundScroll = () => (document.documentElement.style.overflow = "inherit");

const openModal = product => {
     const $modalProduct = document.querySelector(".background-modal-product");
     console.log(product);

     $modalProduct.style.display = "flex";
     removeBackgroundScroll();
     closeModalEscKey($modalProduct);
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

     if (isCloseModal) {
          $modalProduct.style.display = "none";
          addBackgroundScroll();
     }
};
