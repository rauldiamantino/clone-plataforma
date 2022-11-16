const $buttons = document.querySelectorAll("button");
const $banners = document.querySelectorAll(".item");
const maxBanners = $banners.length;
let currentBanner = 0;

clickedButton = button => {
     button.addEventListener("click", () => {
          currentBannerManipulation(button);
     });
};

$buttons.forEach(clickedButton);

const currentBannerManipulation = button => {
     const isLeft = button.classList.contains("left-btn");

     isLeft ? (currentBanner -= 1) : (currentBanner += 1);
     currentBanner >= maxBanners ? (currentBanner = 0) : false;
     currentBanner < 0 ? (currentBanner = maxBanners - 1) : false;
     changeBanner(currentBanner);
};

const changeBanner = currentBanner => {
     $banners[currentBanner].scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
     });
};

const changeBannerAuto = () => {
     setInterval(function () {
          currentBanner += 1;
          currentBanner >= maxBanners ? (currentBanner = 0) : false;
          changeBanner(currentBanner);
     }, 5000);
};

changeBannerAuto();
