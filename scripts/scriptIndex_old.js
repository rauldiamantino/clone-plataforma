// Script MAIN BANNER

let buttonRight = document.querySelector(".button-right");
let buttonLeft = document.querySelector(".button-left");
let mainBanner = document.querySelectorAll(".main-banner-images > img");
let counterBanner = 0;

buttonRight.addEventListener("click", () => {
  removeAllClasses();
  nextImage();
});

buttonLeft.addEventListener("click", () => {
  removeAllClasses();
  prevImage();
});

function nextImage() {
  if (counterBanner < mainBanner.length - 1) {
    counterBanner++;
    addClassSelected(mainBanner[counterBanner]);
  } else {
    counterBanner = -1;
    nextImage();
  }
}

function prevImage() {
  if (counterBanner <= 0) {
    counterBanner = mainBanner.length;
    prevImage();
  } else {
    --counterBanner;
    addClassSelected(mainBanner[counterBanner]);
  }
}

function removeAllClasses() {
  mainBanner.forEach(function (banner) {
    banner.classList.remove("banner-selected");
  });
}

function addClassSelected(banner) {
  banner.classList.add("banner-selected");
}