/* - GET PRODUCTS, AND MODAL WITH THE PRODUCT PAGE
-------------------------------------------------------------------------*/

const $products = document.querySelectorAll(".product");
const clickedProduct = $product => $product.addEventListener("click", () => openModal($product));
$products.forEach(clickedProduct);

/* - MODAL
-------------------------------------------------------------------------*/

const removeBackgroundScroll = () => (document.documentElement.style.overflow = "hidden");
const addBackgroundScroll = () => (document.documentElement.style.overflow = "auto");

const openModal = $product => {
     const $modalProduct = document.querySelector(".modal-product-content");
     const $modalProductBackground = document.querySelector(".modal-product-background");
     const $productImgs = $product.querySelectorAll(".product-data-source-img");

     $modalProductBackground.classList.remove("hidden");

     openModalContent($modalProduct);
     removeBackgroundScroll();
     closeModalEscKey($modalProduct);
     closeModalEscKey($modalProductBackground);
     setProductTexts($product);
     setProductImages($productImgs);
     setProductVariations($product);
     resetProductsCarouselPosition($modalProduct);
     $modalProduct.scrollTop = 0;
};

const resetProductsCarouselPosition = $modalProduct => {
     const $productsCarousel = $modalProduct.querySelector(".container-products-carousel");
     $productsCarousel.setAttribute("id", 0);

     $buttons.forEach($button => {
          const $containerProductsCarousel =
               $button.parentNode.className == "container-products-carousel related-products";
          const $isLeft = $button.classList.contains("left-btn");

          if ($containerProductsCarousel && $isLeft) {
               verifyProductCarouselButton($button);
          }
     });
};

/* - MODAL - variations
-------------------------------------------------------------------------*/
const setProductVariations = $product => {
     const $productColorVariation = $product.querySelectorAll(".prod-variations-color");
     const $productSizeVariation = $product.querySelectorAll(".prod-variations-size");
     const $firstVariation = document.querySelector(".first-variation ul");
     const $secondVariation = document.querySelector(".second-variation ul");

     setSelectedVariation($productColorVariation);
     $firstVariation.innerHTML = "";
     setLiContent($productColorVariation, $firstVariation);
     selectVariationModal($firstVariation);

     setSelectedVariation($productSizeVariation);
     $secondVariation.innerHTML = "";
     setLiContent($productSizeVariation, $secondVariation);
     selectVariationModal($secondVariation);
};

const selectVariationModal = $productVariation => {
     const $variations = $productVariation.querySelectorAll("li");

     $variations.forEach($currentVariation => {
          const isFirstVariation = $currentVariation.parentNode.parentNode.className == "first-variation";

          if (isFirstVariation) {
               const $selectedVariation = document.querySelector(".first-variation-selected");
               addClassesSelectedVariation($variations[0]);

               $variations.forEach($variation => {
                    $variation.addEventListener("click", () => {
                         const variation = $variation.innerText;
                         $selectedVariation.innerText = variation;

                         removeAllClassesSelectedVariation($variations);
                         addClassesSelectedVariation($variation);
                    });
               });
          } else {
               const $selectedVariation = document.querySelector(".second-variation-selected");
               addClassesSelectedVariation($variations[0]);

               $variations.forEach($variation => {
                    $variation.addEventListener("click", () => {
                         const variation = $variation.innerText;
                         $selectedVariation.innerText = variation;

                         removeAllClassesSelectedVariation($variations);
                         addClassesSelectedVariation($variation);
                    });
               });
          }
     });
};

const setLiContent = ($productVariations, $modalVariation) => {
     $productVariations.forEach($variation => {
          const liContent = textVariation($variation);
          addVariation($modalVariation, liContent);
     });
};

const addVariation = ($modalVariation, liContent) => {
     addClassesVariation($modalVariation.appendChild(createElementLi(liContent)));
};

const addClassesVariation = newVariation => newVariation.classList.add("border", "py-2", "px-4", "cursor-pointer");

const addClassesSelectedVariation = newVariation => newVariation.classList.add("bg-c-dark-gray", "text-white");

const removeAllClassesSelectedVariation = variations => {
     variations.forEach(variation => {
          variation.classList.remove("bg-c-dark-gray", "text-white");
     });
};

const textVariation = $variation => document.createTextNode($variation.dataset.variation);

const setSelectedVariation = $productVariations => {
     $productVariations.forEach($currentVariation => {
          if ($currentVariation.classList.contains("prod-variations-color")) {
               const $selectedVariation = document.querySelector(".first-variation-selected");
               const selectedVariation = $productVariations[0].dataset.variation;
               $selectedVariation.innerText = selectedVariation;
          } else {
               const $selectedVariation = document.querySelector(".second-variation-selected");
               const selectedVariation = $productVariations[0].dataset.variation;
               $selectedVariation.innerText = selectedVariation;
          }
     });
};

const setProductTexts = $product => {
     const $productCode = document.querySelector(".modal-product-code");
     const $productRef = document.querySelector(".modal-product-ref");
     const $productName = document.querySelector("#prod-name");
     const $productPrice = document.querySelector("#prod-price");
     const $productDescription = document.querySelector(".prod-description");

     $productName.innerText = $product.querySelector(".product .prod-name").innerText;
     $productPrice.innerText = $product.querySelector(".product .prod-price").innerText;
     $productCode.innerText = $product.querySelector(".product-data-main").dataset.prodcod;
     $productRef.innerText = $product.querySelector(".product-data-main").dataset.prodref;
     $productDescription.innerText = $product.querySelector(".product-data-main").dataset.proddesc;
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
          if ($img.dataset.img != "") {
               const $productImgUrl = $img.dataset.img;
               const htmlProductImg = `<div class="box-small-image w-16 p-1 cursor-pointer border border-gray-200"><img src="${$productImgUrl}" class="product-img h-full object-cover"></div>`;

               $secondaryImagesBox.innerHTML += htmlProductImg;
          }
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
     productImage.setAttribute("class", "min-w-full h-auto object-cover");

     $mainProductImage.appendChild(productImage);
};

const removeCurrentImages = () => {
     const $secondaryImagesBox = document.querySelector(".secondary-images");

     $secondaryImagesBox.innerHTML = "";
     $mainProductImage.innerHTML = "";
};

const currentImageManipulation = button => {
     const isLeft = button.classList.contains("btn-modal-left");
     const isRight = button.classList.contains("btn-modal-right");
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
if ($btnSeeParcels) $btnSeeParcels.addEventListener("click", () => openParcelsModal($btnSeeParcels));

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

     document.body.onresize = () => $modalContent.classList.remove("duration-700");
};

const openModalContent = $modalContent => {
     $modalContent.classList.remove("scale-0", "duration-700");
     $modalContent.classList.add("scale-100", "duration-700");

     document.body.onresize = () => $modalContent.classList.remove("duration-700");
};
