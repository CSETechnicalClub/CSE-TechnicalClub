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

function validateRollID(rollID) {
    if (rollID.length !== 10) {
        return false;
    }
    if (!['21', '22', '23', '24', '25'].includes(rollID.slice(0, 2))) {
        return false;
    }
    if (rollID.slice(2, 4) !== '4E') {
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.sign-in-form');
    const signUpForm = document.querySelector('.sign-up-form');

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const rollno = document.getElementById('rollno').value;
        const password = document.getElementById('inpassword').value;

        if (!rollno || !password) {
            alert('Fill the Details');
            return;
        }

        if (!validateRollID(rollno)) {
            alert('Invalid roll number format.');
            return;
        }

        try {
            const response = await fetch(`https://sistk-technical-club-db-1.onrender.com/api/students/${rollno}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const { student } = await response.json();

            if (!student || !student.password) {
                alert('User data is incomplete or incorrect.');
                return;
            }

            if (student.password.trim() === password.trim()) {
                alert('Sign in successful!');
                localStorage.setItem('rollID', rollno);
                window.location.href = '../index.html';
            } else {
                alert('Invalid roll number or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during sign in. Please try again.');
        }
    });
    signUpForm.addEventListener('submit', async function (event) {
        event.preventDefault();
      
        const rollno = document.getElementById('uname').value;
        const password = document.getElementById('password').value;
      
        if (!rollno || !password) {
          alert('Please fill in all fields.');
          return;
        }
      
        if (!validateRollID(rollno)) {
          alert('Invalid roll number format.');
          return;
        }
      
        try {
          const response = await fetch(`https://sistk-technical-club-db-1.onrender.com/api/students/${rollno}`);
          if (response.ok) {
            const { student } = await response.json();
            alert('User with this Roll No already exists.');
          } else if (response.status === 404) {
            // Create a new user
            const signUpFormData = { rollno, password };
            const createUserResponse = await fetch('https://sistk-technical-club-db-1.onrender.com/api/students', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(signUpFormData),
            });
      
            if (!createUserResponse.ok) {
              throw new Error('Failed to create user');
            }
      
            const createUserData = await createUserResponse.json();
            console.log('Success:', createUserData);
            alert('Account created successfully!');
            localStorage.setItem('rollID', rollno);
            window.location.href = '../index.html';
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred during sign up. Please try again.');
        }
      });
      
});
