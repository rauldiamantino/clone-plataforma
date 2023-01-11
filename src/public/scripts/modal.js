/* - GET PRODUCTS, AND MODAL WITH THE PRODUCT PAGE
-------------------------------------------------------------------------*/

const $products = document.querySelectorAll(".product");
const clickedProduct = $product =>
     $product.addEventListener("click", () => {
          openModal($product);
     });
$products.forEach(clickedProduct);

/* - MODAL
-------------------------------------------------------------------------*/
const removeBackgroundScroll = () => (document.documentElement.style.overflow = "hidden");
const addBackgroundScroll = () => (document.documentElement.style.overflow = "auto");

const resetPositionProductCarousel = () => {
     let sizeScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
     sizeScreen > 1024 ? $buttons.forEach(scrollReset) : $buttons.forEach(scrollResetLeft);
};

const openModal = $product => {
     const $modalProduct = document.querySelector(".modal-product-content");
     const $modalProductBackground = document.querySelector(".modal-product-background");
     const $ModalScrollTop = $modalProduct.querySelector(".modal-product-content-product-page");
     const $relatedProdCarouselModal = $modalProduct.querySelector(".productList");
     const $prodObject = JSON.parse($product.querySelector(".product-obj-data").innerText);

     $ModalScrollTop.scrollTop = 0;
     $modalProductBackground.classList.remove("hidden");
     openModalContent($modalProduct);
     removeBackgroundScroll();
     closeModalEscKey($modalProduct);
     closeModalEscKey($modalProductBackground);
     setProductTexts($product, $prodObject);
     setProductVariations($product, $modalProduct, $prodObject);
     resetPositionCarouselModal($relatedProdCarouselModal);
     document.body.onresize = () => resetPositionProductCarousel();
};

const resetPositionCarouselModal = $carousel => {
     let $buttonLeft;
     let $productLists;
     $carousel.id = 0;

     $buttons.forEach($button => {
          if ($button.classList.contains("btn-left")) $buttonLeft = $button;
     });

     $productLists = $buttonLeft.parentNode.querySelectorAll(".productList");
     carouselScroll($carousel, $buttonLeft);
     removeTransitiionEffect($productLists);
};

/* - MODAL - variations
-------------------------------------------------------------------------*/
const setProductVariations = ($product, $modalProduct, $prodObject) => {
     const $firstProductVariationObj = $prodObject.variations.firstVariation;
     const $firstProductVariation = $product.querySelector(".product-data-variations-first");
     const $modalVariations = $modalProduct.querySelectorAll(".modal-product-content-page-variations ul");

     // console.log($prodObject)

     $modalVariations.forEach(deleteTextsPrev);
     setColorVariations($firstProductVariation, $modalVariations, Object.values($firstProductVariationObj));
};

const deleteTextsPrev = $variation => ($variation.innerHTML = "");

const setColorVariations = ($firstProductVariation, $modalVariations, $firstProductVariationObj) => {
     // const $productColors = $firstProductVariation.querySelectorAll(".prod-variations-color");
     const $productImgs = $firstProductVariation.querySelectorAll(".product-data-source-img");
     const $secondProductVariation = $firstProductVariation.querySelector(".product-data-variations-second");
     const $variationsColors = $secondProductVariation.parentNode.parentNode.querySelectorAll(".prod-variations-color");
     const $variationsColorsReverse = Array.from($variationsColors).reverse();

     $firstProductVariationObj.forEach(findValidColorVariation);

     $modalVariations.forEach($variation => {
          const $firstVariationSelected = $variation.parentNode.querySelector(".first-variation-selected");
          const $secondVariationSelected = $variation.parentNode.querySelector(".second-variation-selected");
          const $modalVariationsSelected = $variation.querySelectorAll("li");

          $modalVariationsSelected.forEach($modalVariation => {
               $variationsColorsReverse.forEach($prodVariation => {
                    setSizeVariations($prodVariation, $modalVariations);
                    setProductImages($productImgs, $prodVariation.dataset.variation);

                    if ($firstVariationSelected) $firstVariationSelected.innerText = $prodVariation.dataset.variation;
               });

               $modalVariation.addEventListener("click", () => {
                    $variationsColorsReverse.forEach($prodVariation => {
                         if ($modalVariation.innerText == $prodVariation.dataset.variation) {
                              setSizeVariations($prodVariation, $modalVariations);
                              setProductImages($productImgs, $prodVariation.dataset.variation);

                              $firstVariationSelected.innerText = $prodVariation.dataset.variation;
                              // $secondVariationSelected.innerText = "";
                         }
                    });
               });
          });

          selectedVariationFormat($modalVariationsSelected[0], $modalVariationsSelected);
     });
};

const findValidColorVariation = colors => {
     const $modalVariations = document.querySelectorAll(".modal-product-content-page-variations ul");

     Object.values(colors).forEach(color => {
          const liContent = color.prodColor;

          $modalVariations.forEach($variation => {
               const $isModalFirstVariation = $variation.parentNode.classList.contains("first-variation");
               if ($isModalFirstVariation) createLiVariationModal(liContent, $variation);
          });
     });
};

const createLiVariationModal = (liContent, $variation) => {
     const li = document.createElement("li");
     const textLi = document.createTextNode(liContent);

     li.appendChild(textLi);
     defaultVariationFormat($variation.appendChild(li));
};
const setSizeVariations = ($secondProductVariation, $modalVariations) => {
     const $productSizes = $secondProductVariation.querySelectorAll(".prod-variations-size");

     $modalVariations.forEach($variation => {
          const $isModalSecondVariation = $variation.parentNode.classList.contains("second-variation");

          if ($isModalSecondVariation) $variation.innerHTML = "";
     });

     $productSizes.forEach($size => {
          const liContent = $size.dataset.variation;

          $modalVariations.forEach($variation => {
               const li = document.createElement("li");
               const textLi = document.createTextNode(liContent);
               const $isModalSecondVariation = $variation.parentNode.classList.contains("second-variation");

               if ($isModalSecondVariation) {
                    li.appendChild(textLi);
                    defaultVariationFormat($variation.appendChild(li));
               }
          });
     });

     $modalVariations.forEach($variationUl => {
          const $variationsLi = $variationUl.querySelectorAll("li");
          $variationsLi.forEach($variation => {
               const $secondVariationSelected =
                    $variation.parentNode.parentNode.parentNode.querySelector(".second-variation-selected");

               $secondVariationSelected.innerText = "";

               $variation.addEventListener("click", () => {
                    if ($variationUl.parentNode.classList.contains("second-variation")) {
                         $secondVariationSelected.innerText = $variation.innerText;
                    } else {
                         $secondVariationSelected.innerText = "";
                    }
                    selectedVariationFormat($variation, $variationsLi);
               });
          });
     });
};

const defaultVariationFormat = $variation =>
     $variation.classList.add("border", "rounded-full", "py-2", "px-4", "cursor-pointer");

const selectedVariationFormat = ($variation, $modalVariationsSelected) => {
     $modalVariationsSelected.forEach($variation => {
          $variation.classList.remove("bg-c-dark-gray", "text-white");
     });
     $variation.classList.add("bg-c-dark-gray", "text-white");
};

const setProductTexts = ($product, $prodObject) => {
     const $productCode = document.querySelector(".modal-product-code");
     const $productRef = document.querySelector(".modal-product-ref");
     const $productName = document.querySelector("#prod-name");
     const $productPrice = document.querySelector("#prod-price");
     const $productQty = document.querySelector("#product-quantity");
     const $productDescription = document.querySelector(".prod-description");
     const $modalPrice = parseFloat($prodObject.price);

     $productName.innerText = $prodObject.name;
     $productPrice.innerText = formatNumber($modalPrice);
     $productQty.value = 1;

     $productCode.innerText = $prodObject.code;
     $productRef.innerText = $prodObject.reference;
     $productDescription.innerText = $prodObject.description;
};

/* - MODAL - IMAGES OF THE PRODUCTS
-------------------------------------------------------------------------*/
const $productImages = document.querySelectorAll(".product-images > img");
let currentImageProduct = 0;

/* get images in the data-set and set in the product modal */
const setProductImages = ($productImgs, $selectedVariation) => {
     removeCurrentImages();
     appendProductImg($productImgs, $selectedVariation);
     setMainImage();
};

const appendProductImg = ($productImgs, $selectedVariation) => {
     const $secondaryImagesBox = document.querySelector(".secondary-images");

     $productImgs.forEach($img => {
          if ($img.dataset.img != "") {
               const $productImgUrl = $img.dataset.img;
               const htmlProductImg = `
                    <div class="box-small-image p-1 cursor-pointer border border-gray-200 w-full h-12">
                         <img src="${$productImgUrl}" class="product-img">
                    </div>`;

               if ($img.parentNode.parentNode.dataset.variation == $selectedVariation) {
                    $secondaryImagesBox.innerHTML += htmlProductImg;
                    $images = $secondaryImagesBox.querySelectorAll("img");
               }
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

     // verify if $mainProductImage exists in the page, and set style transform
     if ($mainProductImage) $mainProductImage.style.transform = styleTranslateDefinition;

     addMainImageBorder();
};

const addMainImageBorder = () => {
     if ($mainProductImage) {
          const $imgs = $mainProductImage.querySelectorAll("img");
          $imgs.forEach($img => $img.classList.add("p-1", "w-full", "h-full", "object-cover"));
     }
};

const closeModalEscKey = $modal => {
     const isproductPaymentModalContent = $modal.classList.contains("product-payment-internal-modal");
     const isproductPaymentCartContent = $modal.classList.contains("product-payment-internal-cart");
     const isModalProductModalContent = $modal.classList.contains("modal-product-content");
     const isShippingModalCartContent = $modal.classList.contains("shipping-container-modal");
     document.addEventListener("keydown", e => {
          if (e.key === "Escape") {
               if (
                    isproductPaymentModalContent ||
                    isModalProductModalContent ||
                    isproductPaymentCartContent ||
                    isShippingModalCartContent
               ) {
                    closeModalContent($modal);
               } else {
                    $modal.classList.add("hidden");
               }
          }
          addBackgroundScroll();
          hideBoxReturnShippingModalProduct();
          hideErrorEmptyInputShipping();

          document.body.onresize = () => resetPositionProductCarousel();
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

          document.body.onresize = () => resetPositionProductCarousel();
          hideBoxReturnShippingModalProduct();
          hideErrorEmptyInputShipping();
     }
};

/* - MODAL - see-parcels
-------------------------------------------------------------------------*/
const $btnSeeParcels = document.querySelector(".product-payment-see-parcels");
if ($btnSeeParcels) $btnSeeParcels.addEventListener("click", () => openParcelsModal($btnSeeParcels));

const openParcelsModal = $btnSeeParcels => {
     const $productPrice = removeFormatNumber($btnSeeParcels.parentNode.querySelector("#prod-price").innerText);

     const $productPaymentModalBackground = document.querySelector(".product-payment-modal-background");
     const $productPaymentModalContent = document.querySelector(".product-payment-internal-modal");

     $productPaymentModalBackground.classList.remove("hidden");
     openModalContent($productPaymentModalContent);
     closeModalEscKey($productPaymentModalBackground);
     closeModalEscKey($productPaymentModalContent);
     getProductPayments($productPrice, $productPaymentModalContent);
};

const getProductPayments = ($productPrice, $productPaymentContent) => {
     const $productPaymentModalCredit = document.querySelector(".product-payment-credit");
     const $productPaymentModalTicket = document.querySelector(".product-payment-ticket");
     const $productPaymentModalCreditCart = document.querySelector(".product-payment-credit-cart");
     const $productPaymentModalTicketCart = document.querySelector(".product-payment-ticket-cart");
     const isProductPaymentCartContent = $productPaymentContent.classList.contains("product-payment-internal-cart");

     if (isProductPaymentCartContent) {
          printProductCreditParcels($productPrice, $productPaymentModalCreditCart);
          printProductTicket($productPrice, $productPaymentModalTicketCart);
     } else {
          printProductCreditParcels($productPrice, $productPaymentModalCredit);
          printProductTicket($productPrice, $productPaymentModalTicket);
     }
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

const closeParcelsModal = button => {
     const $productPaymentModalBackground = document.querySelector(".product-payment-modal-background");
     const $productPaymentModalContent = document.querySelector(".product-payment-internal-modal");
     const $productPaymentCartBackground = document.querySelector(".product-payment-cart-background");
     const $productPaymentCartContent = document.querySelector(".product-payment-internal-cart");
     const isCloseModal = button.classList.contains("btn-close-payment-modal");
     const isCloseModalCart = button.classList.contains("btn-close-payment-cart");

     if (isCloseModal || isCloseModalCart) {
          if ($productPaymentModalBackground) {
               $productPaymentModalBackground.classList.add("hidden");
               closeModalContent($productPaymentModalContent);
          }

          if (isCloseModalCart) {
               $productPaymentCartBackground.classList.add("hidden");
               closeModalContent($productPaymentCartContent);
          }
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

const getShippingValue = $button => {
     const $isBtnCalcShipping = $button.classList.contains("calc-shipping");
     const $isBtnCalcShippingCart = $button.classList.contains("shipping-container-modal-button");

     if ($isBtnCalcShipping || $isBtnCalcShippingCart) {
          const inputBoxShipping = $button.parentNode.querySelector("#product-shipping-cep").value;

          if (inputBoxShipping !== "") {
               const zipCode = inputBoxShipping;
               const priceShipping = 25.13;

               shipping = {
                    code: zipCode,
                    price: priceShipping,
               };

               saveShippingValueToCookie(shipping);
               showBoxReturnShippingModalProduct();
          } else {
               showErrorEmptyInputShipping();
          }
     }
};

const showBoxReturnShippingModalProduct = () => {
     const $boxReturnShipping = document.querySelector(".modal-shipping-return-price");
     $boxReturnShipping.classList.remove("hidden");
     hideErrorEmptyInputShipping();
};

const hideBoxReturnShippingModalProduct = () => {
     const $boxReturnShipping = document.querySelector(".modal-shipping-return-price");
     $boxReturnShipping.classList.add("hidden");
};

const showErrorEmptyInputShipping = () => {
     const $boxReturnErrorShipping = document.querySelector(".modal-shipping-return-empty");
     $boxReturnErrorShipping.classList.remove("hidden");
     hideBoxReturnShippingModalProduct();
};

const hideErrorEmptyInputShipping = () => {
     const $boxReturnErrorShipping = document.querySelector(".modal-shipping-return-empty");
     $boxReturnErrorShipping.classList.add("hidden");
};

/* - MODAL - shipping
-------------------------------------------------------------------------*/
const $inputBoxShipping = document.querySelector("#product-shipping-cep");
$inputBoxShipping.addEventListener("click", () => {
     // boxReturnShippingErrorModalProduct();
});
