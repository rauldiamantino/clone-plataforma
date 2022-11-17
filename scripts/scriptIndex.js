/* GET BUTTONS AND BANNERS */
const $buttons = document.querySelectorAll("button");
const $banners = document.querySelectorAll(".item");
let currentBanner = 0;

const clickedButton = button => {
     button.addEventListener("click", () => {
          currentBannerManipulation(button);
     });
};

$buttons.forEach(clickedButton);

/* CHANGE MANUAL AND AUTO ROTATE BANNER */
const changeBanner = currentBanner => {
     const $mainBanner = document.querySelector("#main-banner");
     const styleTranslateDefinition = `translateX(${-currentBanner * 100}%)`;
     $mainBanner.style.transform = styleTranslateDefinition;
};

const changeBannerAuto = () => {
     setInterval(function () {
          currentBannerManipulation($buttons[1]);
     }, 5000);
};

changeBannerAuto();

/* CHECK THE BUTTON CLICKED AND CALL THE FUNCTION TO CHANGE THE BANNER */
const currentBannerManipulation = button => {
     const isLeft = button.classList.contains("left-btn");
     const maxBanners = $banners.length;

     /* manipulation current banner */
     isLeft ? (currentBanner -= 1) : (currentBanner += 1);
     currentBanner >= maxBanners ? (currentBanner = 0) : false;
     currentBanner < 0 ? (currentBanner = maxBanners - 1) : false;

     /* call the function to change the banner */
     changeBanner(currentBanner);
};
