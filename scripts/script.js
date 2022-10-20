let mainBanner = document.querySelector(".main-banner");
let buttonRight = clickSideMainBanner(document.querySelector(".button-right"));
let buttonLeft = clickSideMainBanner(document.querySelector(".button-left"));

function clickSideMainBanner(button) {
  button.addEventListener("click", () => {
    verifyButton(button);
  });
}

function verifyButton(button) {
  if (button.classList.contains("button-right")) {
    rightSideBanner();
  } else {
    leftSideBanner();
  }
}

function rightSideBanner() {
  if (mainBanner.classList.contains("banner1")) {
    mainBanner.classList.add("banner2");
    mainBanner.classList.remove("banner1");
  } else if (mainBanner.classList.contains("banner2")) {
    mainBanner.classList.add("banner3");
    mainBanner.classList.remove("banner2");
  } else if (mainBanner.classList.contains("banner3")) {
    mainBanner.classList.add("banner1");
    mainBanner.classList.remove("banner3");
  }
}

function leftSideBanner() {
  if (mainBanner.classList.contains("banner3")) {
    mainBanner.classList.add("banner2");
    mainBanner.classList.remove("banner3");
  } else if (mainBanner.classList.contains("banner2")) {
    mainBanner.classList.add("banner1");
    mainBanner.classList.remove("banner2");
  } else if (mainBanner.classList.contains("banner1")) {
    mainBanner.classList.add("banner3");
    mainBanner.classList.remove("banner1");
  }
}
