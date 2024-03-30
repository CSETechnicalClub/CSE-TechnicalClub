document.addEventListener('DOMContentLoaded', async function () {

    const rollNoInput = document.getElementById("rollno");

    // Check if rollID exists in local storage
    const rollID = localStorage.getItem('rollID');
    if (rollID) {
        // Set the value of rollNoInput to the rollID from local storage
        rollNoInput.value = rollID;
    }

    // Event listener for input change
    rollNoInput.addEventListener("input", function () {
        const enteredValue = rollNoInput.value.toUpperCase();
        rollNoInput.value = enteredValue;
    });



    // Function to fetch user data based on roll number
    async function fetchUserData(rollNumber) {
        try {
            const response = await fetch(`https://db-csetechnicalclub.onrender.com/users?rollno=${rollNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Register Now')
            window.location.href = '../index.html'
            return null;
        }
    }

    // Function to check if the user has already written the test
    async function checkTestTaken(rollNumber) {
        const userData = await fetchUserData(rollNumber);
        if (userData && userData.PythonWeek2) {
            return true; // Test already taken
        }
        return false; // Test not taken
    }

    // Event listener for form submission
    document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const rollNumber = rollNoInput.value;
        const testTaken = await checkTestTaken(rollNumber);

        if (testTaken) {
            alert('You have already written the test for Python Week 2.');
        } else {
            // Display questions
            document.getElementsByClassName('quiz')[0].style.display = 'none';
            document.getElementById('quiz-container').style.display = 'block';
            window.removeEventListener('beforeunload', preventUnload);
        }
    });
});

const questions = [
    {
        "question": "What does the `==` operator compare in Python?",
        "options": ["Objects", "Variables", "Values", "Types"],
        "explanation": "The `==` operator compares the values of its operands in Python.",
        "answer": "Values",
        "selected_option": null,
    },
    {
        "question": "Which built-in function allows you to get information about an object in Python?",
        "options": ["info()", "details()", "type()", "about()"],
        "explanation": "The `type()` built-in function returns information about an object's type in Python.",
        "answer": "type()",
        "selected_option": null,
    },
    {
        "question": "What is the output of the expression `3 * 4 ** 2 / 2` in Python?",
        "options": ["6", "24", "9", "50"],
        "explanation": "In Python, this expression evaluates to `(3 * (4 ** 2)) / 2`, which equals `24`.",
        "answer": "24",
        "selected_option": null,
    },
    {
        "question": "Which list method removes the last item from a list and returns it in Python?",
        "options": ["pop()", "remove()", "del[]", "append()"],
        "explanation": "The `pop()` method removes the last item from a list and returns it.",
        "answer": "pop()",
        "selected_option": null,
    },
    {
        "question": "What is the difference between a tuple and a list in Python?",
        "options": ["Immutable vs Mutable", "Ordered vs Unordered", "Indexed vs Associative", "Heterogeneous vs Homogeneous"],
        "explanation": "Tuples are immutable ordered collections of elements, while lists are mutable ordered collections of elements in Python.",
        "answer": "Immutable vs Mutable",
        "selected_option": null,
    },
    {
        "question": "What is the output of the expression `'spam'[::-1]` in Python?",
        "options": ['["m", "a", "p", "s"]', '"maps"', 'None', 'SyntaxError'],
        "explanation": "This slices the string `'spam'` backwards, resulting in the string `'maps'`.",
        "answer": '"maps"',
        "selected_option": null,
    },
    {
        "question": "What is the scope resolution order used in Python when looking up names in nested functions?",
        "options": ["LEGB Rule", "FIFO Rule", "LIFO Rule", "GEBL Rule"],
        "explanation": "Python uses the LEGB rule (Local, Enclosing, Global, Built-in) to resolve names in nested functions.",
        "answer": "LEGB Rule",
        "selected_option": null,
    },
    {
        "question": "What is a lambda function in Python?",
        "options": ["A regular function defined with the def keyword", "An anonymous inline function", "A generator function", "A decorator function"],
        "explanation": "Lambda functions are anonymous inline functions that take any number of arguments, but have just one expression.",
        "answer": "An anonymous inline function",
        "selected_option": null,
    },
    {
        "question": "What is the return value of the input() function in Python?",
        "options": ["None", "True", "False", "String"],
        "explanation": "The `input()` function always returns a string in Python.",
        "answer": "String",
        "selected_option": null,
    },
    {
        "question": "What is the primary usage of \_\_init\_\_.py file in Python directories?",
        "options": ["To define private methods", "To create classes", "To execute startup scripts", "To specify directory packages"],
        "explanation": "__init__.py files help Python recognize a directory as a package, allowing users to import modules contained in that directory.",
        "answer": "To specify directory packages",
        "selected_option": null,
    }
];

const quizContainer = document.getElementById('quiz-container');

// Function to display questions and options
function displayQuestions() {
    questions.forEach((question, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');

        const questionText = document.createElement('p');
        questionText.classList.add('question-text');
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionContainer.appendChild(questionText);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach((option, optionIndex) => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn');
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => {
                selectOption(questionContainer, question, option);
            });
            optionsContainer.appendChild(optionBtn);
        });
        questionContainer.appendChild(optionsContainer);

        quizContainer.appendChild(questionContainer);
    });
}

// Function to handle option selection
function selectOption(questionContainer, question, selectedOption) {
    question.selectedOption = selectedOption;
    const optionBtns = questionContainer.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    checkAllOptionsSelected();
}

// Function to check if all options are selected
function checkAllOptionsSelected() {
    const allOptionsSelected = questions.every(question => question.selectedOption !== null);
    submitBtn.disabled = !allOptionsSelected;
}


// Function to calculate score
function calculateScore() {
    let score = 0;
    questions.forEach(question => {
        if (question.selectedOption === question.answer) {
            score++;
        }
    });
    return score;
}

// Function to display score
async function displayScore() {
    const score = calculateScore();
    const resultContainer = document.createElement('div');
    resultContainer.className = 'score-container';
    resultContainer.textContent = `Your score: ${score} out of ${questions.length}`;
    quizContainer.appendChild(resultContainer);

    questions.forEach((question, index) => {
        const questionContainer = document.getElementsByClassName('question-container')[index];
        const optionBtns = questionContainer.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            if (question.selectedOption === question.answer) {
                if (btn.textContent === question.selectedOption) {
                    btn.classList.add('correct');
                }
            } else {
                if (btn.textContent === question.selectedOption) {
                    btn.classList.add('wrong');
                    const explanationText = document.createElement('p');
                    explanationText.textContent = `Explanation: ${question.explanation}`;
                    questionContainer.appendChild(explanationText);
                }
                if (btn.textContent === question.answer) {
                    btn.classList.add('correct');
                }
            }
            // Disable option buttons
            btn.disabled = true;
        });
    });

    try {
        // Get the roll number input value
        const rollNumber = document.getElementById('rollno').value;
    
        // Fetch user data based on roll number
        const response = await fetch(`https://db-csetechnicalclub.onrender.com/users/${rollNumber}`);
    
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
    
        // Parse response data
        const userData = await response.json();
    
        if (userData) {
            // Update PythonWeek2 score
            if (!userData.hasOwnProperty('PythonWeek2')) {
                userData.PythonWeek2 = score;
            } else {
                alert('You have already written the test for Python Week 2.');
            }
    
            // Update the user's data in the database
            const updateResponse = await fetch(`https://db-csetechnicalclub.onrender.com/users/${rollNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            // Check if update was successful
            if (!updateResponse.ok) {
                throw new Error('Failed to update user data');
            } else {
                // Successful update
                alert('User data updated successfully!');
            }
        } else {
            // User not found
            alert('User data not found for the entered roll number.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating user data. Please try again.');
    }
    
submitBtn.disabled = true;    

}
// Initialize the quiz
displayQuestions();

const submitBtn = document.createElement('button');
submitBtn.id = 'submit-btn';
submitBtn.textContent = 'Submit';
submitBtn.disabled = true;
submitBtn.addEventListener('click', () => {
    displayScore();
});
quizContainer.appendChild(submitBtn);
