/* GET BUTTONS */
const $buttons = document.querySelectorAll("button");

const clickedButton = button => {
     button.addEventListener("click", () => {
          currentBannerManipulation(button);
          openResponsiveMenu(button);
          closeModal(button);
          currentProductListManipulation(button);
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

/* PRODUCT LINE CAROUSEL WITH FOUR COLUMNS*/
let currentProductList = 0;
const $productList = document.querySelectorAll("#products-line > .product-list");

const currentProductListManipulation = button => {
     const isBtnProductsLeft = button.classList.contains("prod-btnLeft-carousel");
     const isBtnProductsRight = button.classList.contains("prod-btnRight-carousel");
     const maxProductList = $productList.length - 1;

     if (isBtnProductsLeft) {
          currentProductList -= 1;
     }

     if (isBtnProductsRight) {
          currentProductList += 1;
     }

     currentProductList >= maxProductList ? (currentProductList = maxProductList) : false;
     currentProductList < 0 ? (currentProductList = 0) : false;
     changeProductList(currentProductList, $productList);
};

const changeProductList = (currentProductList, productList) => {
     const styleTranslateDefinition = `translateX(${-currentProductList * 100}%)`;
     productList.forEach(list => {
          list.style.transform = styleTranslateDefinition;
     });
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
