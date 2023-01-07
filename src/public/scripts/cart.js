/* - Fields cart
-------------------------------------------------------------------------*/
let $containerPageCart = document.querySelector(".product-cart");
let $productsCartCookie = document.querySelectorAll(".prod-cart-cookie");

const getProdCartObj = prodCartStr => JSON.parse(getCookie(prodCartStr));

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
          secondVariation: $prodCartObjectCookie.secondVariation,
          qty: $prodQtyInput,
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

$productsCartCookie.forEach($product => {
     let $nameCookieStr;
     const $inputQty = $product.querySelector(".cfptb-qty");
     const $nameProductCart = $product.querySelector(".cfptt-title");

     updateProductNameCart($nameCookieStr, $nameProductCart);
     updateTotalPriceCart($nameCookieStr, $inputQty);

     $product.addEventListener("change", () => {
          $nameCookieStr = $inputQty.parentNode.parentNode.dataset.namecookie;
          const $nameCookieObj = getProdCartObj($nameCookieStr);
          changeQty($inputQty, $nameCookieObj);
     });

     $product.addEventListener("click", () => {
          $nameCookieStr = $inputQty.parentNode.parentNode.dataset.namecookie;
          const $btnDelete = $product.querySelector(".cfptt-delete");
          deleteProductCart($nameCookieStr, $btnDelete);
     });
});

const deleteProductCart = ($nameCookieStr, $btnDelete) => {
     const $nameCookieObj = getProdCartObj($nameCookieStr);

     deleteProdCookie($nameCookieStr);
};

const deleteProdCookie = $nameCookieStr => {
     let data = new Date(2022, 1, 01);
     data = data.toGMTString();

     document.cookie = `${$nameCookieStr}=-1; expires= ${data} ;`;
     window.location.reload(true);
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
