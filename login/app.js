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

// Define the validateRollID function
function validateRollID(rollID) {
    // Check if the length is exactly 10 characters
    if (rollID.length !== 10) {
        return false;
    }

    if (!['21', '22', '23', '24', '25'].includes(rollID.slice(0, 2))) {
        return false;
    }

    if (rollID.slice(2, 4) !== '4E') {
        return false;
    }

    // All conditions passed, return true
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.sign-in-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const rollno = document.getElementById('rollno').value;
        const password = document.getElementById('inpassword').value;

        if (!rollno || !password) {
            alert('Fill the Details');
            return;
        }

        // Validate the Roll Number
        if (!validateRollID(rollno)) {
            alert('Invalid roll number format.');
            return;
        }

        // Fetch user data based on roll number
        try {
            const response = await fetch(`https://db-csetechnicalclub.onrender.com/users?rollno=${rollno}`);

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userDataList = await response.json();

            if (!Array.isArray(userDataList) || userDataList.length === 0) {
                throw new Error('User data not found');
            }

            const filteredUser = userDataList.find(user => user.id === rollno);

            if (filteredUser) {
                // User found, proceed with password comparison
                if (filteredUser.hasOwnProperty('password') && typeof filteredUser.password === 'string') {
                    // Compare passwords
                    if (filteredUser.password.trim() === password.trim()) {
                        // Successful sign in
                        alert('Sign in successful!');
                        localStorage.setItem('rollID', rollno);
                        window.location.href = '../index.html';
                    } else {
                        // Passwords do not match
                        alert('Invalid roll number or password.');
                    }
                } else {
                    throw new Error('Invalid user data format');
                }
            } else {
                // User not found
                alert('User data not found for the entered roll number.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during sign in. Please try again.');
        }

    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.sign-up-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const rollno = document.getElementById('uname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check if all fields are filled
        if (!rollno || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Validate the Roll Number
        if (!validateRollID(rollno)) {
            alert('Invalid roll number format.');
            return;
        }

        // Using rollno as id for uniqueness
        const signUpFormData = {
            id: rollno, // Set the rollno as the id explicitly
            email: email,
            password: password
        };

        // Check if the rollno already exists in the database
        fetch('https://db-csetechnicalclub.onrender.com/users')
            .then(response => response.json())
            .then(data => {
                const existingUser = data.find(user => user.id === rollno);
                if (existingUser) {
                    alert('User with this Roll No already exists.');
                } else {
                    // If rollno doesn't exist, proceed with registration
                    // Proceed with registration
                    fetch('https://db-csetechnicalclub.onrender.com/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(signUpFormData),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            alert('Account created successfully!');
                            localStorage.setItem('rollID', rollno);
                            window.location.href = '../index.html';
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            alert('An error occurred while creating the account.');
                        });
                }
            })
            .catch(error => console.error('Error checking existing users:', error));
    });

    function validateRollID(rollID) {
        // Check if the length is exactly 10 characters
        if (rollID.length !== 10) {
            return false;
        }

        // Check if the first two digits are 21, 22, 23, or 24
        if (!['21', '22', '23', '24'].includes(rollID.slice(0, 2))) {
            return false;
        }

        // Check if the next two letters are '4E'
        if (rollID.slice(2, 4) !== '4E') {
            return false;
        }

        // Check if the following two characters are either '1A' or '5A'
        if (!['1A', '5A'].includes(rollID.slice(4, 6))) {
            return false;
        }

        // All conditions passed, return true
        return true;
    }
});
