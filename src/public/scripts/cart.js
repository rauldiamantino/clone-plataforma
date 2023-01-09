/* - Fields cart
-------------------------------------------------------------------------*/
let $containerPageCart = document.querySelector(".product-cart");
let $productsCartCookie = document.querySelectorAll(".prod-cart-cookie");

const getProdCartObj = prodCartStr => JSON.parse(getCookie(prodCartStr));

const deleteProdCookie = $nameCookieStr => {
     let data = new Date(2022, 1, 01);
     data = data.toGMTString();

     document.cookie = `${$nameCookieStr}=-1; expires= ${data} ;`;
     window.location.reload(true);
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
          const returnFreteValue = removeFormatNumber(document.querySelector(".return-frete-value").innerText);
          const $returnFreteField = document.querySelector(".return-frete");

          if ($returnFreteField.classList.contains("hidden")) {
               total = totalPriceAllCarts.reduce((soma, i) => soma + i);
          } else {
               total = totalPriceAllCarts.reduce((soma, i) => soma + i) + returnFreteValue;
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

const showReturnFreteValue = $button => {
     const $isBtnCalcShipping = $button.classList.contains("ccdcb-shipping");
     const $returnFreteValueField = document.querySelector(".return-frete");
     const returnFreteValue = document.querySelector(".return-frete-value").innerText;

     if ($isBtnCalcShipping) {
          $returnFreteValueField.classList.remove("hidden");
          // saveFreteValueToCookie(returnFreteValue);
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
          deleteProdCookie($nameCookieStr);
          changeQty($inputQty, $nameCookieObj);
     });

     $product.addEventListener("click", event => {
          const $btnDelete = $product.querySelector(".cfptt-delete");
          if (event.composedPath()[0] === $btnDelete) {
               $nameCookieStr = $btnDelete.parentNode.parentNode.dataset.namecookie;
               deleteProdCookie($nameCookieStr);
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
