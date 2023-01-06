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
     }
};

// const getProductPayments = ($productPrice, $productPaymentCartContent) => {
//      const $productPaymentCartCredit = document.querySelector(".product-payment-credit");
//      const $productPaymentCartTicket = document.querySelector(".product-payment-ticket");

//      printProductCreditParcels($productPrice, $productPaymentCartCredit);
//      printProductTicket($productPrice, $productPaymentCartTicket);
// };

// const printProductCreditParcels = ($productPrice, $productPaymentCartCredit) => {
//      const maxParcels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//      $productPaymentCartCredit.innerHTML = "";
//      maxParcels.forEach((parcel, index) => {
//           const calculateParcel = formatNumber($productPrice / parcel);
//           const liContent = textParcel(index, calculateParcel);

//           $productPaymentCartCredit.appendChild(createElementLi(liContent));
//      });
// };
