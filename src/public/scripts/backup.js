/* - PRODUCT LINE CAROUSEL
-------------------------------------------------------------------------*/
let $prodCarousel;
let $allProductsCarousel = document.querySelectorAll("#products-line .product");

const verifyProductCarouselButton = $button => {
     const $currentCarousel = document.querySelector(`.${getCarouselButtonClass($button)}`);

     if (verifyIfExistsInThePage($currentCarousel)) {
          setPropertiesOfProductCarousels(getCarouselButtonClass($button), $currentCarousel);
          manipulationCounterCarousel($button, $currentCarousel);
     }
};

const getCarouselButtonClass = $button => {
     const isLeft = $button.classList.contains("left-btn");
     const isRight = $button.classList.contains("right-btn");

     if (isLeft || isRight) {
          const $classCarousel = $button.parentNode.lastElementChild.lastElementChild.className;
          return $classCarousel;
     }
};

const verifyIfExistsInThePage = $currentCarousel =>
     $currentCarousel && $currentCarousel.parentNode.className ? true : false;

const setPropertiesOfProductCarousels = ($classCarousel, $currentCarousel) => {
     $allProductsCarousel = document.querySelectorAll(`.${$classCarousel} .product`);
     $prodCarousel = $currentCarousel;
};

const manipulationCounterCarousel = ($button, $currentCarousel) => {
     const isLeft = $button.classList.contains("left-btn");
     const isRight = $button.classList.contains("right-btn");
     const $carousel = $currentCarousel.parentNode.parentNode;
     let counterCarousel = $carousel.id;

     if (isLeft) counterCarousel--;
     if (isRight) counterCarousel++;
     if (counterCarousel <= 0) counterCarousel = 0;
     if (counterCarousel >= counterLimiter()) counterCarousel = counterLimiter();
     if ($prodCarousel) $prodCarousel.style.transform = styleTranslateDefinition(counterCarousel);

     $carousel.setAttribute("id", counterCarousel);
};

const styleTranslateDefinition = counter => `translateX(${-counter * 100}%)`;

const counterLimiter = () => limiter(carouselXProductsPixels());

const limiter = carouselXProductsPixels => {
     // verify if $prodCarousel exists in the page, and get width
     const widthCarousel = $prodCarousel ? $prodCarousel.offsetWidth : false;
     const result = carouselXProductsPixels / widthCarousel - 1;
     return roundResult(result);
};

const roundResult = number => number.toFixed(0);

const carouselXProductsPixels = () => {
     // verify if $allProductsCarousel exists in the page, and get width
     const widthProducts = $allProductsCarousel[0] ? $allProductsCarousel[0].offsetWidth : false;
     const result = $allProductsCarousel.length * widthProducts;

     return result;
};

/* call the function if resize the screen */
document.body.onresize = () => {
     $buttons.forEach($button => {
          const $isProductsCarousel = $button.parentNode.classList.contains("container-products-carousel");

          if ($isProductsCarousel) {
               const $currentCarousel = document.querySelector(`.${getCarouselButtonClass($button)}`);
               manipulationCounterCarousel($button, $currentCarousel);
          }
     });
};