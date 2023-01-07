/* - Fields cart
-------------------------------------------------------------------------*/
let $containerPageCart = document.querySelector(".product-cart");
let $productsCartCookie = document.querySelectorAll(".prod-cart-cookie");

$productsCartCookie.forEach($product => {
     let $nameCookieStr;

     $product.addEventListener("click", () => {
          const $btnDelete = $product.querySelector(".cfptt-delete");
          deleteProductCart($btnDelete);
     });

     $product.addEventListener("change", () => {
          const $inputQty = $product.querySelector(".cfptb-qty");
          $nameCookieStr = $inputQty.parentNode.parentNode.dataset.namecookie;
          const $nameCookieObj = getProdCartObj($nameCookieStr);
          changeQty($inputQty, $nameCookieObj);
     });
});

const getProdCartObj = prodCartStr => JSON.parse(getCookie(prodCartStr));

const changeQty = ($inputQty, $nameCookieStr) => {
     const $prodCartObjectCookie = $nameCookieStr;

     getProdPrintedCart($inputQty, $prodCartObjectCookie);
};

const getProdPrintedCart = (field, $prodCartObjectCookie) => {
     const $prodQty = field.parentNode.parentNode.parentNode.querySelector(".cfptb-qty").value;

     const $productCartToChange = {
          name: $prodCartObjectCookie.name,
          code: $prodCartObjectCookie.code,
          reference: $prodCartObjectCookie.reference,
          price: $prodCartObjectCookie.price,
          firstVariation: $prodCartObjectCookie.firstVariation,
          secondVariation: $prodCartObjectCookie.secondVariation,
          qty: $prodQty,
     };

     console.log("update:");
     console.log($productCartToChange);
     console.log("origin:");
     console.log($prodCartObjectCookie);

     saveProdToCookie($productCartToChange);
};

const deleteProductCart = $btnDelete => {
     const $prodFromBtn = $btnDelete.parentNode.parentNode;
     calcTotalCartFromBtn($prodFromBtn);
};

const calcTotalCartFromBtn = $prodFromBtn => {
     const $qtyInput = $prodFromBtn.querySelector(".cfptb-qty").value;
     const $qtyPrintedText = $prodFromBtn.querySelector(".qtyPartialPrice").innerText;
};

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
