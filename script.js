
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

document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');
  const loginText = document.getElementById('loginText');

  const rollID = localStorage.getItem('rollID');
  if (rollID) {
      loginText.textContent = rollID; // Display Roll ID if logged in
      loginBtn.addEventListener('click', function (event) {
          event.preventDefault();
          if (confirm('Are you sure you want to log out?')) {
              localStorage.removeItem('rollID'); // Remove Roll ID from localStorage
              window.location.href = '/login/SignIn.html'; // Redirect to logout page
          }
      });
  } else {
      loginBtn.addEventListener('click', function (event) {
          // Perform any other action needed for the register/sign-in button
      });
  }
});

/*COURSES */

const BasicsOfGit = getElementById('BasicsOfGit');
const MicrosoftPython = getElementById('MicrosoftPython');
const FunAI = getElementById('FunAI');
const WebDev = getElementById('WebDev');
const JsNodeJS = getElementById('JsNodeJS');

BasicsOfGit.addEventListener('click', function () {
  window.location.href = 'https://learn.microsoft.com/en-us/training/paths/get-started-github-and-visual-studio-code/?wt.mc_id=studentamb_299348';
});

MicrosoftPython.addEventListener('click', function () {
  window.location.href = 'https://learn.microsoft.com/en-us/training/paths/python-language/?wt.mc_id=studentamb_299348';
});

FunAI.addEventListener('click', function () {
  window.location.href = 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/?wt.mc_id=studentamb_299348';
});

WebDev.addEventListener('click', function () {
  window.location.href = 'https://learn.microsoft.com/en-us/training/paths/web-development-101/?wt.mc_id=studentamb_299348';
});

JsNodeJS.addEventListener('click', function () {
  window.location.href = 'https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-nodejs/?wt.mc_id=studentamb_299348';
});

/*COURSES */  
