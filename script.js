
window.addEventListener("load", () =>{
  const loader =document.querySelector(".loader");

  loader.classList.add("loader-hidden");

  loader .addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  })
})
'use strict';



/**
 * element toggle function
 */

const toggleElem = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navTogglers.length; i++) {
  navTogglers[i].addEventListener("click", function () {
    toggleElem(navbar);
    toggleElem(overlay);
  });
}



/**
 * header sticky & back to top button
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    header.classList.add("header-anim");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
    header.classList.remove("header-anim");
  }
});



/**
 * search box toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    toggleElem(searchBox);
  });
}



/**
 * whishlist button toggle
 */

const whishlistBtns = document.querySelectorAll("[data-whish-btn]");

for (let i = 0; i < whishlistBtns.length; i++) {
  whishlistBtns[i].addEventListener("click", function () {
    toggleElem(this);
  });
}

function redirectToUrl(id, url) {
  const element = document.getElementById(id);
  element.addEventListener('click', () => {
      window.location.href = url;
  });
}

redirectToUrl('BasicsOfGit', 'https://learn.microsoft.com/en-us/training/modules/introduction-to-github-visual-studio-code/?wt.mc_id=studentamb_299348');
redirectToUrl('MicrosoftPython', 'https://learn.microsoft.com/en-us/training/paths/beginner-python/?wt.mc_id=studentamb_299348');
redirectToUrl('FunAI', 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/?wt.mc_id=studentamb_299348');
redirectToUrl('WebDev', 'https://learn.microsoft.com/en-us/training/paths/web-development-101/?wt.mc_id=studentamb_299348');
redirectToUrl('JsNodeJS', 'https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-nodejs/?wt.mc_id=studentamb_299348');
