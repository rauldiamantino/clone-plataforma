const $banners = document.querySelectorAll(".main-banner-images img");
const $buttons = document.querySelectorAll(".buttons-banner-main img");
let counterBanner = 0;

const clickedButton = $buttons => {
     $buttons.forEach(button => {
          button.addEventListener("click", () => {
               removeAllBannerClasses();
               button.classList.contains("button-right") ? nextBanner() : prevBanner();
          });
     });
};

clickedButton($buttons);

const removeAllBannerClasses = () => {
     $banners.forEach(banner => {
          banner.classList.remove("banner-selected");
     });
};

const addClassToBanner = banner => {
     banner.classList.add("banner-selected");
     console.log(banner)
};

const nextBanner = () => {
     counterBanner < $banners.length - 1
          ? (++counterBanner, addClassToBanner($banners[counterBanner]))
          : ((counterBanner = -1), nextBanner());
};

const prevBanner = () => {
     counterBanner <= 0
          ? ((counterBanner = $banners.length), prevBanner())
          : (--counterBanner, addClassToBanner($banners[counterBanner]));
};
