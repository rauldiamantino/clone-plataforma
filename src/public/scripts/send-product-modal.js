const checkIfIsPurchaseBtn = $button => $button.id == "product-purchase";

const getProductWithVariationsModal = $button => {
     if (checkIfIsPurchaseBtn($button)) {
          const $modal = $button.parentNode.parentNode.parentNode;
          getDataProductSelectedModal($modal);
     }
};

const getDataProductSelectedModal = $modal => {
     const $productCart = {
          name: $modal.querySelector("#prod-name").innerText,
          code: $modal.querySelector(".modal-product-code").innerText,
          reference: $modal.querySelector(".modal-product-ref").innerText,
          price: $modal.querySelector("#prod-price").innerText,
          firstVariation: $modal.querySelector(".first-variation-selected").innerText,
          image: $modal.querySelector(".product-images img").src,
          secondVariation: $modal.querySelector(".second-variation-selected").innerText,
          qty: $modal.querySelector("#product-quantity").value,
          prodOrigin: {
               product: {
                    code: $modal.querySelector(".modal-product-code").innerText,
                    reference: $modal.querySelector(".modal-product-ref").innerText,
                    name: $modal.querySelector("#prod-name").innerText,
                    price: $modal.querySelector("#prod-price").innerText,
                    description: $modal.querySelector(".prod-description").innerText,
                    mainImage: "../images/products/13.jpg",
                    variations: {
                         firstVariation: {
                              colors: [
                                   {
                                        prodColor: "Branco",
                                        images: ["../images/products/13.jpg", "../images/products/14.jpg"],
                                        secondVariation: ["P", "M", "G"],
                                   },
                              ],
                         },
                    },
               },
          },
     };

     checkIfVariationsAreSelecteds($productCart);
};

const checkIfVariationsAreSelecteds = $productCart => {
     if ($productCart.firstVariation == "" || $productCart.secondVariation == "") {
          alert("Por favor escolha uma das variações");
     } else {
          saveProdToCookie($productCart);
          window.location.href = "/carrinho";
     }
};

const saveProdToCookie = $productCart => {
     const $productCartToJSON = JSON.stringify($productCart);
     let data = new Date(2023, 12, 01);
     data = data.toGMTString();

     document.cookie = `C${$productCart.code}F${$productCart.firstVariation}S${$productCart.secondVariation}Q${$productCart.qty}=${$productCartToJSON}; expires= ${data} ;`;
};

const saveShippingValueToCookie = shipping => {
     const $shippingToJSON = JSON.stringify(shipping);
     let data = new Date(2023, 12, 01);

     data = data.toGMTString();
     document.cookie = `shippingValue=${$shippingToJSON}; expires= ${data} ;`;

     return $shippingToJSON;
};

const getCookie = name => {
     let cookie = {};

     document.cookie.split(";").forEach(function (el) {
          let [k, v] = el.split("=");
          cookie[k.trim()] = v;
     });

     return cookie[name];
};
