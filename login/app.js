const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.sign-in-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!username || !password) {
            alert('Fill the Details')
            return;
        }

        const signInFormData = {
            username: username,
            password: password
        };

    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.sign-up-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const username = document.getElementById('uname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            alert('Please fill in all fields.'); 
            return; 
        }

        const signUpFormData = {
            username: username,
            email: email,
            password: password
        };
    });
});
