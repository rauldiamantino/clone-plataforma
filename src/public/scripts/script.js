/* - SCROLL - ALERT MESSAGE
-------------------------------------------------------------------------*/
const $alertMessage = document.querySelector("#header-alert-message");

const hiddenScroll = () => {
     if (window.scrollY > 147) {
          $alertMessage.classList.add("absolute");
     }
     if (window.scrollY < 147) {
          $alertMessage.classList.remove("absolute");
     }
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
     if (document.body.clientWidth > 900) {
          $buttons.forEach($button => {
               const $isProductsCarousel = $button.parentNode.className == "container-products-carousel";
               const $isLeft = $button.classList.contains("left-btn");

               if ($isLeft && $isProductsCarousel) {
                    const $currentCarousel = document.querySelector(`.${getCarouselButtonClass($button)}`);
                    manipulationCounterCarousel($button, $currentCarousel);
               }
          });
     }
};

/* - MENU RESPONSIVE
-------------------------------------------------------------------------*/

const openResponsiveMenu = button => {
     const isRespButtonToOpen = button.classList.contains("button-responsive");
     const categoriesMenu = document.querySelector(".background-categories");
     const $menuCategorieItems = document.querySelectorAll(".inactivate-link");

     if (isRespButtonToOpen) {
          categoriesMenu.classList.add("menu-categories-open");
          categoriesMenu.classList.remove("menu-categories-close");

          $menuCategorieItems.forEach($item => {
               const $hasNoSubcategorie = $item.parentNode.lastElementChild.childNodes.length;

               if ($hasNoSubcategorie == 1) {
                    $item.remove();
               }
          });
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
     const $modalProduct = document.querySelector(".modal-product-content");
     const $modalProductBackground = document.querySelector(".modal-product-background");
     const $productImgs = $product.querySelectorAll(".product-source-img");

     $modalProductBackground.classList.remove("hidden");

     openModalContent($modalProduct);
     removeBackgroundScroll();
     closeModalEscKey($modalProduct);
     closeModalEscKey($modalProductBackground);
     setProductTexts($product);
     setProductImages($productImgs);
     resetProductsCarouselPosition($modalProduct);
};

const resetProductsCarouselPosition = $modalProduct => {
     const $productsCarousel = $modalProduct.querySelector(".container-products-carousel");
     $productsCarousel.setAttribute("id", 0);

     $buttons.forEach($button => {
          const $containerProductsCarousel = $button.parentNode.className == "container-products-carousel";
          const $isLeft = $button.classList.contains("left-btn");

          if ($containerProductsCarousel && $isLeft) {
               verifyProductCarouselButton($button);
          }
     });
};

const setProductTexts = $product => {
     const $productCode = document.querySelector(".modal-product-code");
     const $productRef = document.querySelector(".modal-product-ref");
     const $productName = document.querySelector("#prod-name");
     const $productPrice = document.querySelector("#prod-price");
     const $productDescription = document.querySelector(".prod-description");

     $productName.innerText = $product.querySelector(".product-box-text .prod-carousel-prodName").innerText;
     $productPrice.innerText = $product.querySelector(".product-box-text .prod-carousel-prodPrice").innerText;
     $productCode.innerText = $product.dataset.prodcod;
     $productRef.innerText = $product.dataset.prodref;
     $productDescription.innerText = $product.dataset.proddesc;

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

     if ($mainProductImage && $mainProductImage.childNodes.length == 0) {
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
     const isproductPaymentModalContent = $modalProduct.classList.contains("product-payment-internal-modal");
     const isModalProductModalContent = $modalProduct.classList.contains("modal-product-content");

     document.addEventListener("keydown", e => {
          if (e.key === "Escape") {
               if (isproductPaymentModalContent || isModalProductModalContent) {
                    closeModalContent($modalProduct);
               } else {
                    $modalProduct.classList.add("hidden");
               }
          }
          addBackgroundScroll();
     });
};

const closeModal = button => {
     const $modalProductContent = document.querySelector(".modal-product-content");
     const $modalProductBackground = document.querySelector(".modal-product-background");
     const isCloseModal = button.classList.contains("btn-close-modal");

     if (isCloseModal) {
          closeModalContent($modalProductContent);
          $modalProductBackground.classList.add("hidden");
          addBackgroundScroll();
     }
};

/* - MODAL - see-parcels
-------------------------------------------------------------------------*/
const $btnSeeParcels = document.querySelector(".product-payment-see-parcels");
$btnSeeParcels.addEventListener("click", () => openParcelsModal($btnSeeParcels));

const openParcelsModal = $btnSeeParcels => {
     const $productPrice = $btnSeeParcels.parentNode.querySelector("#prod-price").innerText;
     const $productPaymentModalBackground = document.querySelector(".product-payment-modal-background");
     const $productPaymentModalContent = document.querySelector(".product-payment-internal-modal");

     $productPaymentModalBackground.classList.remove("hidden");
     openModalContent($productPaymentModalContent);
     closeModalEscKey($productPaymentModalBackground);
     closeModalEscKey($productPaymentModalContent);
     getProductPayments($productPrice, $productPaymentModalContent);
};

const getProductPayments = ($productPrice, $productPaymentModalContent) => {
     const $productPaymentModalCredit = document.querySelector(".product-payment-credit");
     const $productPaymentModalTicket = document.querySelector(".product-payment-ticket");

     printProductCreditParcels($productPrice, $productPaymentModalCredit);
     printProductTicket($productPrice, $productPaymentModalTicket);
};

const printProductCreditParcels = ($productPrice, $productPaymentModalCredit) => {
     const maxParcels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

     $productPaymentModalCredit.innerHTML = "";
     maxParcels.forEach((parcel, index) => {
          const calculateParcel = formatNumber($productPrice / parcel);
          const liContent = textParcel(index, calculateParcel);

          $productPaymentModalCredit.appendChild(createElementLi(liContent));
     });
};

const printProductTicket = ($productPrice, $productPaymentModalTicket) => {
     const textDiscount = " (desconto de 5%)";
     const calculateParcel = formatNumber($productPrice - (5 / 100) * $productPrice) + textDiscount;
     const index = 0;
     const liContent = textParcel(index, calculateParcel);

     $productPaymentModalTicket.innerHTML = "";
     $productPaymentModalTicket.appendChild(createElementLi(liContent));
};

const textParcel = (index, calculateParcel) => document.createTextNode(`${index + 1}x R$ ${calculateParcel}`);

const createElementLi = liContent => {
     const li = document.createElement("li");

     li.appendChild(liContent);
     return li;
};

const formatNumber = number => number.toFixed(2).replace(".", ",");

const closeParcelsModal = button => {
     const $productPaymentModalBackground = document.querySelector(".product-payment-modal-background");
     const $productPaymentModalContent = document.querySelector(".product-payment-internal-modal");
     const isCloseModal = button.classList.contains("btn-close-payment-modal");

     if (isCloseModal) {
          $productPaymentModalBackground.classList.add("hidden");
          closeModalContent($productPaymentModalContent);
     }
};

const closeModalContent = $modalContent => {
     $modalContent.classList.add("scale-0", "duration-700");
     $modalContent.classList.remove("scale-100", "duration-700");
};

const openModalContent = $modalContent => {
     $modalContent.classList.remove("scale-0", "duration-700");
     $modalContent.classList.add("scale-100", "duration-700");
};

/* - CATEGORIES NAVBAR
-------------------------------------------------------------------------*/

const categoriesMenu = document.querySelectorAll(".categories-a");
categoriesMenu.forEach(categorie => {
     categorie.addEventListener("click", () => {
          return false;
     });
});
