const checkIfIsPurchaseBtn = $button => $button.id == "product-purchase";

const getProductWithVariationsModal = $button => {
     if (checkIfIsPurchaseBtn($button)) {
          const $modal = $button.parentNode.parentNode;
          getDataProductSelectedModal($modal);
     }
};

const getDataProductSelectedModal = $modal => {
     const $product = {
          name: $modal.querySelector("#prod-name").innerText,
          code: $modal.querySelector(".modal-product-code").innerText,
          reference: $modal.querySelector(".modal-product-ref").innerText,
          price: $modal.querySelector("#prod-price").innerText,
          firstVariation: $modal.querySelector(".first-variation-selected").innerText,
          secondVariation: $modal.querySelector(".second-variation-selected").innerText,
          qty: $modal.querySelector("#product-quantity").value,
          cep: $modal.querySelector("#product-shipping-cep").value,
     };

     checkIfVariationsAreSelecteds($product);
};

const checkIfVariationsAreSelecteds = $product => {
     if ($product.firstVariation == "" || $product.secondVariation == "") {
          alert("Por favor escolha uma das variações");
     } else {
          saveProdToCookie($product);
     }
};

const saveProdToCookie = $product => {
     const $productToJSON = JSON.stringify($product);
     let data = new Date(2023, 1, 01);
     data = data.toGMTString();

     document.cookie = `C${$product.code}F${$product.firstVariation}S${$product.secondVariation}Q${$product.qty}=${$productToJSON}; expires= ${data} ;`;
};

const getCookie = name => {
     let cookie = {};

     document.cookie.split(";").forEach(function (el) {
          let [k, v] = el.split("=");
          cookie[k.trim()] = v;
     });

     return cookie[name];
};

// console.log(JSON.parse(getCookie("001-P-1")));

var todos_os_cookies = document.cookie;
// console.log(todos_os_cookies);
