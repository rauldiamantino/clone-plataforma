const checkIfIsPurchaseBtn = $button => $button.id == "product-purchase";

const getProductWithVariationsModal = $button => {
     if (checkIfIsPurchaseBtn($button)) {
          const $modal = $button.parentNode.parentNode;
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
     };

     checkIfVariationsAreSelecteds($productCart);
};

const checkIfVariationsAreSelecteds = $productCart => {
     if ($productCart.firstVariation == "" || $productCart.secondVariation == "") {
          alert("Por favor escolha uma das variações");
     } else {
          saveProdToCookie($productCart);
     }
};

const saveProdToCookie = $productCart => {
     const $productCartToJSON = JSON.stringify($productCart);
     let data = new Date(2023, 1, 01);
     data = data.toGMTString();

     document.cookie = `C${$productCart.code}F${$productCart.firstVariation}S${$productCart.secondVariation}Q${$productCart.qty}=${$productCartToJSON}; expires= ${data} ;`;
};

const getCookie = name => {
     let cookie = {};

     document.cookie.split(";").forEach(function (el) {
          let [k, v] = el.split("=");
          cookie[k.trim()] = v;
     });

     return cookie[name];
};
