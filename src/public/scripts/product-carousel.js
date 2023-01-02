const getProductList = $button => {
     const $productList = $button.parentNode.querySelector(".productList");
     carouselScroll($productList, $button);
};

const scrollReset = $button => {
     const $isBtnRight = $button.classList.contains("btn-right");
     if ($isBtnRight) getProductList($button), scrollResetLeft($button);
};

const scrollResetLeft = $button => {
     const $products = $button.parentNode.querySelector(".productList");

     $buttons.forEach($button => {
          const $isBtnLeft = $button.classList.contains("btn-left");
          if ($isBtnLeft) getProductList($button), removeTransitiionEffect($products);
     });
};

const removeTransitiionEffect = element => element.classList.remove("duration-700");

document.body.onresize = () => {
     let sizeScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
     sizeScreen > 1024 ? $buttons.forEach(scrollReset) : $buttons.forEach(scrollResetLeft);
};

const carouselScroll = ($productList, $button) => {
     const $isBtnLeft = $button.classList.contains("btn-left");
     const $isBtnRight = $button.classList.contains("btn-right");
     const $products = $button.parentNode.querySelector(".productList");

     if ($products) $products.classList.add("duration-700");

     if ($isBtnLeft) $productList.style.transform = `translateX(-${decreaseIdProductList($productList)}%)`;
     if ($isBtnRight) $productList.style.transform = `translateX(-${increaseIdProductList($productList)}%)`;
};

const maxScroll = $productList => {
     let maxScroll = 0;

     window.innerWidth < 1024
          ? (maxScroll = $productList.parentNode.querySelector(".mobile").id)
          : (maxScroll = $productList.parentNode.querySelector(".desktop").id);

     maxScroll = $productList.children.length / maxScroll - 1;

     return maxScroll;
};

const increaseIdProductList = $productList => {
     let max = maxScroll($productList);

     $productList.id++;
     if ($productList.id > max) $productList.id = max;

     console.log(max);

     return $productList.id * 100;
};

const decreaseIdProductList = $productList => {
     $productList.id--;
     if ($productList.id < 0) $productList.id = 0;

     return $productList.id * 100;
};
