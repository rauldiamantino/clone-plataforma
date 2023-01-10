/* - Fields cart
-------------------------------------------------------------------------*/
let $containerPageCart = document.querySelector(".product-cart");
let $productsCartCookie = document.querySelectorAll(".prod-cart-cookie");

const getProdCartObj = prodCartStr => JSON.parse(getCookie(prodCartStr));

const deleteCookie = $nameCookieStr => {
     let data = new Date(2022, 1, 01);
     data = data.toGMTString();

     document.cookie = `${$nameCookieStr}=-1; expires= ${data} ;`;

     if ($nameCookieStr !== "shippingValue") {
          window.location.reload(true);
     }
};

const changeQty = ($inputQty, $nameCookieStr) => {
     const $prodCartObjectCookie = $nameCookieStr;
     getProdPrintedCart($inputQty, $prodCartObjectCookie);
};

const getProdPrintedCart = (field, $prodCartObjectCookie) => {
     const $prodQtyInput = field.parentNode.parentNode.parentNode.querySelector(".cfptb-qty").value;
     const $prodQtyPrice = field.parentNode.parentNode.parentNode.querySelector(".qtyPartialPrice");
     const $prodPrice = field.parentNode.parentNode.parentNode.querySelector(".partialPrice");
     const $totalPrice = field.parentNode.parentNode.parentNode.querySelector(".cfptb-total-price");
     const $productCartToChange = {
          name: $prodCartObjectCookie.name,
          code: $prodCartObjectCookie.code,
          reference: $prodCartObjectCookie.reference,
          price: $prodCartObjectCookie.price,
          firstVariation: $prodCartObjectCookie.firstVariation,
          image: $prodCartObjectCookie.image,
          secondVariation: $prodCartObjectCookie.secondVariation,
          qty: $prodQtyInput,
          prodOrigin: $prodCartObjectCookie.prodOrigin,
     };
     saveProdToCookie($productCartToChange);
     printNewQtyPrice($prodQtyPrice, $prodQtyInput);
     printNewTotalPriceCart(calcTotalProdCart($prodQtyInput, $prodPrice), $totalPrice);
};

const printNewQtyPrice = ($prodQtyPrice, $prodQtyInput) => ($prodQtyPrice.innerText = $prodQtyInput);

const printNewTotalPriceCart = (newTotal, $totalPrice) => ($totalPrice.innerText = newTotal);

const calcTotalProdCart = ($prodQtyInput, $prodPrice) => {
     const qty = $prodQtyInput;
     const price = removeFormatNumber($prodPrice.innerText);
     const total = formatNumber(qty * price);
     return total;
};

const updateTotalPriceCart = ($nameCookieStr, $inputQty) => {
     $nameCookieStr = $inputQty.parentNode.parentNode.dataset.namecookie;
     const $nameCookieObj = getProdCartObj($nameCookieStr);
     changeQty($inputQty, $nameCookieObj);
};

const updateProductNameCart = ($nameCookieStr, $nameProductCart) => {
     $nameCookieStr = $nameProductCart.parentNode.parentNode.dataset.namecookie;
     const $nameCookieObj = getProdCartObj($nameCookieStr);
     const newNameProductCart = $nameCookieObj.name;

     changeNameProdCart($nameProductCart, newNameProductCart);
};

const changeNameProdCart = ($nameProductCart, newNameProductCart) => {
     $nameProductCart.innerText = newNameProductCart;
};

const dontShowCartIfEmpty = () => {
     const cart = document.querySelector(".allProductsCart");
     const emptyCart = document.querySelector(".empty-cart");

     if ($productsCartCookie.length == 0) {
          if (cart) cart.classList.add("hidden"), emptyCart.classList.remove("hidden");
     } else {
          cart.classList.remove("hidden"), emptyCart.classList.add("hidden");
     }
};

let totalPriceAllCarts = [0];
let totalItemsAllCarts = [0];

const printTotalsCartPage = () => {
     const $subTotalPriceCartPage = document.querySelector(".ccdcb-subtotal");
     const $totalItemsCartPage = document.querySelector(".ccdcb-items");
     const $totalPriceCartPage = document.querySelector(".container-cart-discount-coupon-total");

     printSubTotalPrice($subTotalPriceCartPage);
     printSubTotalItems($totalItemsCartPage);
     printTotalPrice($totalPriceCartPage);
};

const printSubTotalPrice = $subTotalPriceCartPage => {
     if ($subTotalPriceCartPage) {
          const total = totalPriceAllCarts.reduce((soma, i) => soma + i);
          $subTotalPriceCartPage.innerText = formatNumber(total);
     }
};

const printTotalPrice = $totalPriceCartPage => {
     if ($totalPriceCartPage) {
          let total;
          const $returnShippingField = document.querySelector(".return-shipping");
          const returnShippingValue = document.querySelector(".return-shipping-value");

          if (getCookie("shippingValue") !== undefined) {
               returnShippingValue.innerText = formatNumber(JSON.parse(getCookie("shippingValue")).price);
          }
          if (returnShippingValue.innerText == "" || totalItemsAllCarts.length == 1) {
               $returnShippingField.classList.add("hidden");
               deleteCookie("shippingValue");

               total = totalPriceAllCarts.reduce((soma, i) => soma + i);
          } else {
               $returnShippingField.classList.remove("hidden");
               total =
                    totalPriceAllCarts.reduce((soma, i) => soma + i) +
                    removeFormatNumber(returnShippingValue.innerText);
          }

          $totalPriceCartPage.innerText = formatNumber(total);
     }
};

const printSubTotalItems = $totalItemsAllCarts => {
     if ($totalItemsAllCarts) {
          const total = totalItemsAllCarts.reduce((soma, i) => soma + i);
          let text;

          total == 1 ? (text = "item") : (text = "itens");
          $totalItemsAllCarts.innerText = `${total} ${text}`;
     }
};

const getTotalsBoxDiscount = $product => {
     const $prodCartTotalPrice = $product.querySelector(".cfptb-total-price").innerText;
     const $prodCartTotalItems = $product.querySelector(".cfptb-qty").value;

     totalPriceAllCarts.push(removeFormatNumber($prodCartTotalPrice));
     totalItemsAllCarts.push(parseFloat($prodCartTotalItems));
};

const showReturnShippingValue = $button => {
     const $isBtnCalcShippingModalCart = $button.classList.contains("shipping-container-modal-butto");

     if ($isBtnCalcShippingModalCart) {
          const returnShippingValue = document.querySelector(".return-shipping-value");
          const $returnShippingField = document.querySelector(".return-shipping");

          getShippingValue($button);
          returnShippingValue.innerText = JSON.parse(getCookie("shippingValue")).price;
          getShippingValue($button);          
          printTotalsCartPage();
     }
};

$productsCartCookie.forEach($product => {
     let $nameCookieStr;
     const $inputQty = $product.querySelector(".cfptb-qty");
     const $nameProductCart = $product.querySelector(".cfptt-title");

     updateProductNameCart($nameCookieStr, $nameProductCart);
     updateTotalPriceCart($nameCookieStr, $inputQty);

     $product.addEventListener("change", () => {
          $nameCookieStr = $inputQty.parentNode.parentNode.dataset.namecookie;
          const $nameCookieObj = getProdCartObj($nameCookieStr);
          deleteCookie($nameCookieStr);
          changeQty($inputQty, $nameCookieObj);
     });

     $product.addEventListener("click", event => {
          const $btnDelete = $product.querySelector(".cfptt-delete");
          if (event.composedPath()[0] === $btnDelete) {
               $nameCookieStr = $btnDelete.parentNode.parentNode.dataset.namecookie;
               deleteCookie($nameCookieStr);
          }
     });

     getTotalsBoxDiscount($product);
});

dontShowCartIfEmpty();
printTotalsCartPage();

/* - Cart - see-parcels
-------------------------------------------------------------------------*/
const $btnSeeParcelsCart = document.querySelector(".ccdcb-see-parcels");
if ($btnSeeParcelsCart) $btnSeeParcelsCart.addEventListener("click", () => openParcelsCart($btnSeeParcelsCart));

const openParcelsCart = $btnSeeParcelsCart => {
     const $productPrice = removeFormatNumber(
          $btnSeeParcelsCart.parentNode.querySelector(".container-cart-discount-coupon-total").innerText
     );
     const $productPaymentCartBackground = document.querySelector(".product-payment-cart-background");
     const $productPaymentCartContent = document.querySelector(".product-payment-internal-cart");

     $productPaymentCartBackground.classList.remove("hidden");
     openModalContent($productPaymentCartContent);
     closeModalEscKey($productPaymentCartBackground);
     closeModalEscKey($productPaymentCartContent);
     getProductPayments($productPrice, $productPaymentCartContent);
};

const closeParcelsCart = button => {
     const $productPaymentCartBackground = document.querySelector(".product-payment-cart-background");
     const $productPaymentCartContent = document.querySelector(".product-payment-internal-cart");
     const isCloseCart = button.classList.contains("btn-close-payment-cart");

     if (isCloseCart) {
          $productPaymentCartBackground.classList.add("hidden");
          closeModalContent($productPaymentCartContent);
          addProductToCart();
     }
};

/* - Cart - shipping-modal
-------------------------------------------------------------------------*/
const openShippingModalCart = $button => {
     const $isBtnCalcShippingModal = $button.classList.contains("ccdcb-shipping");

     if ($isBtnCalcShippingModal) {
          const $shippingModalCartBackground = document.querySelector(".shipping-background-modal");
          const $shippingModalCartContent = document.querySelector(".shipping-container-modal");

          $shippingModalCartBackground.classList.remove("hidden");
          openModalContent($shippingModalCartContent);
          closeModalEscKey($shippingModalCartBackground);
          closeModalEscKey($shippingModalCartContent);
     }
};

const closeShippingModalCart = $button => {
     const $shippingModalCartBackground = document.querySelector(".shipping-background-modal");
     const $shippingModalCartContent = document.querySelector(".shipping-container-modal");
     const isCloseCart = $button.classList.contains("btn-close-shipping-modal");

     if (isCloseCart) {
          $shippingModalCartBackground.classList.add("hidden");
          closeModalContent($shippingModalCartContent);
     }
};
