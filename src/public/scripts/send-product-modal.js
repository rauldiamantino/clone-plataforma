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
          qtde: $modal.querySelector("#product-quantity").value,
          cep: $modal.querySelector("#product-shipping-cep").value,
     };

     checkIfVariationsAreSelecteds($product);
};

const checkIfVariationsAreSelecteds = $product => {
     if ($product.firstVariation == "" || $product.secondVariation == "") {
          alert("Por favor escolha uma das variações");
     } else {
          console.log($product);
     }
};

const checkIfIsPurchaseBtn = $button => $button.id == "product-purchase";
