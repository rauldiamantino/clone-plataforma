/* - SCROLL - ALERT MESSAGE
-------------------------------------------------------------------------*/
const $alertMessage = document.querySelector("#header-alert-message");

const hiddenScroll = () => {
     window.scrollY > 147 ? $alertMessage.classList.add("absolute") : $alertMessage.classList.remove("absolute");
};

document.addEventListener("scroll", hiddenScroll);

/* - GET BUTTONS 
-------------------------------------------------------------------------*/
const $buttons = document.querySelectorAll("button");

const clickedButton = $button => {
     $button.addEventListener("click", e => {
          closeModal($button);
          closeParcelsModal($button);
          openResponsiveMenu($button);
          verifyBannerCarouselButton($button);
          verifyProductCarouselButton($button);
          currentImageManipulation($button);
          submitLogin($button, e);
          submitRegister($button, e);
          submitContact($button, e);
     });
};

$buttons.forEach(clickedButton);

/* - LOGIN PAGE
-------------------------------------------------------------------------*/
const submitLogin = ($button, e) => {
     const $isBtnLogin = $button.classList.contains("login-login");
     const $loginInputs = document.querySelectorAll(".login-formulary-inputs input");

     if ($isBtnLogin) getValueInputs($loginInputs, e);
};

/* - CONTACT PAGE
-------------------------------------------------------------------------*/

const submitContact = ($button, e) => {
     const $isBtnContact = $button.classList.contains("contact-button");
     const $loginInputs = document.querySelectorAll(".contact-form input");

     if ($isBtnContact) getValueInputs($loginInputs, e);
};

/* - REGISTER PAGE
-------------------------------------------------------------------------*/

const submitRegister = ($button, e) => {
     const $isBtnRegister = $button.classList.contains("register-button");
     const $loginInputs = document.querySelectorAll(".register-form input");

     if ($isBtnRegister) getValueInputs($loginInputs, e);
};

/* - ERROR MESSAGES - LOGIN AND REGISTER PAGES
-------------------------------------------------------------------------*/
const addPrintErrorMessageLogin = $loginErrorMessage => {
     $loginErrorMessage.classList.remove("hidden");

     document.documentElement.scrollTop = 0;

     removePrintErrorMessageLogin($loginErrorMessage);
};

const removePrintErrorMessageLogin = $loginErrorMessage => {
     setTimeout(() => {
          $loginErrorMessage.classList.add("hidden");
     }, 3000);
};

const getValueInputs = ($loginInputs, e) => {
     $loginInputs.forEach($input => {
          if ($input.value == 0) {
               const $emptyErrorMessage = document.querySelector(".empty-login-error-message");
               e.preventDefault();
               addPrintErrorMessageLogin($emptyErrorMessage);
          }
     });
};
/* - CHANGE MANUAL AND AUTO ROTATE BANNER
-------------------------------------------------------------------------*/

// let $banners = document.querySelectorAll(".item");
let $banners;
let currentBanner = 0;

const changeBanner = (currentBanner, $classCarousel) => {
     const $mainBanner = document.querySelector(`.${$classCarousel}`);
     const styleTranslate = `translateX(${-currentBanner * 100}%)`;

     // verify if $mainBanner exists in the page, and set style transform
     if ($mainBanner) $mainBanner.style.transform = styleTranslate;
};

const verifyBannerCarouselButton = $button => {
     const isLeft = $button.classList.contains("left-btn");
     const isRight = $button.classList.contains("right-btn");

     if (isLeft || isRight) {
          const $classCarousel = $button.parentNode.lastElementChild.lastElementChild.className;
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
     }, 5000);

     return intervalForChangingBanner;
};

const nextBanner = () => {
     $buttons.forEach($button => {
          const $containerBanner = $button.parentNode.className == "containerMainBanner";
          const $isRight = $button.classList.contains("right-btn");

          if ($containerBanner && $isRight) {
               verifyBannerCarouselButton($button);
          }
     });
};

const stopBannerAuto = () => clearInterval(intervalForChangingBanner);

const stopIfTheMouseEnters = () => {
     const $mainBanner = document.querySelector(".containerMainBanner");

     if ($mainBanner) {
          $mainBanner.addEventListener("mouseover", () => {
               stopBannerAuto();
          });
          $mainBanner.addEventListener("mouseout", () => changeBannerAuto());
     }
};

/* Call the functions for the start and stop banner rotation */
changeBannerAuto();
stopIfTheMouseEnters();

/* - PRODUCT LINE CAROUSEL
-------------------------------------------------------------------------*/
let $prodCarousel;
let $allProductsCarousel = document.querySelectorAll("#products-line .product");

const verifyProductCarouselButton = $button => {
     const $currentCarousel = document.querySelector(`.${getCarouselButtonClass($button)}`);

     if (verifyIfExistsInThePage($currentCarousel)) {
          setPropertiesOfProductCarousels(getCarouselButtonClass($button), $currentCarousel);
          manipulationCounterCarousel($button, $currentCarousel);
     }
};

const getCarouselButtonClass = $button => {
     const isLeft = $button.classList.contains("left-btn");
     const isRight = $button.classList.contains("right-btn");

     if (isLeft || isRight) {
          const $classCarousel = $button.parentNode.lastElementChild.lastElementChild.className;
          return $classCarousel;
     }
};

const verifyIfExistsInThePage = $currentCarousel =>
     $currentCarousel && $currentCarousel.parentNode.className ? true : false;

const setPropertiesOfProductCarousels = ($classCarousel, $currentCarousel) => {
     $allProductsCarousel = document.querySelectorAll(`.${$classCarousel} .product`);
     $prodCarousel = $currentCarousel;
};

const manipulationCounterCarousel = ($button, $currentCarousel) => {
     const isLeft = $button.classList.contains("left-btn");
     const isRight = $button.classList.contains("right-btn");
     const $carousel = $currentCarousel.parentNode.parentNode;
     let counterCarousel = $carousel.id;

     if (isLeft) counterCarousel--;
     if (isRight) counterCarousel++;
     if (counterCarousel <= 0) counterCarousel = 0;
     if (counterCarousel >= counterLimiter()) counterCarousel = counterLimiter();
     if ($prodCarousel) $prodCarousel.style.transform = styleTranslateDefinition(counterCarousel);

     $carousel.setAttribute("id", counterCarousel);
};

const styleTranslateDefinition = counter => `translateX(${-counter * 100}%)`;

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

/* call the function if resize the screen */
document.body.onresize = () => {
     $buttons.forEach($button => {
          const $isProductsCarousel = $button.parentNode.classList.contains("container-products-carousel");

          if ($isProductsCarousel) {
               const $currentCarousel = document.querySelector(`.${getCarouselButtonClass($button)}`);
               manipulationCounterCarousel($button, $currentCarousel);
          }
     });
};

/* - MENU RESPONSIVE
-------------------------------------------------------------------------*/

const openResponsiveMenu = button => {
     const isRespButtonToOpen = button.classList.contains("button-responsive");
     const $backgroundCategoriesMenu = document.querySelector(".background-categories");
     const $categoriesMenu = document.querySelector(".content-categories");
     const $menuCategorieItems = document.querySelectorAll(".inactivate-link");

     if (isRespButtonToOpen) {
          $backgroundCategoriesMenu.classList.remove("hidden");
          $categoriesMenu.classList.remove("menu-categories-close");

          $menuCategorieItems.forEach($item => {
               const $hasNoSubcategorie = $item.parentNode.lastElementChild.childNodes.length;

               if ($hasNoSubcategorie == 1) {
                    $item.remove();
               }
          });
     } else {
          closeRespMenu(button, $backgroundCategoriesMenu, $categoriesMenu);
     }
};

const closeRespMenu = (button, $backgroundCategoriesMenu, $categoriesMenu) => {
     const isRespButtonToClose = button.classList.contains("button-responsive-close");

     if (isRespButtonToClose) {
          $backgroundCategoriesMenu.classList.add("hidden");
          $categoriesMenu.classList.add("menu-categories-close");
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

/* - CATEGORIES NAVBAR
-------------------------------------------------------------------------*/

const categoriesMenu = document.querySelectorAll(".categories-a");
categoriesMenu.forEach(categorie => {
     categorie.addEventListener("click", () => {
          return false;
     });
});
