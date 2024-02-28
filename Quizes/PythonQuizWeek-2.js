var rollNoInput = document.getElementById("rollno");
rollNoInput.addEventListener("input", function () {
    var enteredValue = rollNoInput.value;
    var uppercaseValue = enteredValue.toUpperCase();
    rollNoInput.value = uppercaseValue;
});


// Function to check if Roll Number exists in the list
async function checkRollNumber(rollNumber) {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQGbV_1Jqtq1zqGnVCXs98DNEqC1l6LtRmRr1rONTxqeHveooDoWfuHxnfX5FJksbfjKliwqtmzBF74/pub?gid=0&single=true&output=csv');
    const csvData = await response.text();
    const rows = csvData.split('\n');
    const rollNumbers = rows.map(row => row.split(',')[0]); // Assuming Roll Numbers are in the first column
    return rollNumbers.includes(rollNumber);
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', async function (event) {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
    });

    event.preventDefault();
    const rollNumber = document.getElementById('rollno').value;
    const rollNumberExists = await checkRollNumber(rollNumber);
    if (rollNumberExists) {
        alert('Already Submitted. Please wait for the next quiz.');
        window.location.href = "../Quizes.html";
    } else {
        document.getElementsByClassName('quiz')[0].style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        window.removeEventListener('beforeunload', preventUnload);
    }
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
    if (allOptionsSelected) {
        submitBtn.disabled = false;
    }
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
function displayScore() {
    const score = calculateScore();
    const resultContainer = document.createElement('div');
    resultContainer.className = 'score-container'
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

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxjF4ag35Q-_zxrOKN3G5SdbYwYWbXKhA78YEE4mVmByhWxdWGssZr9YvGRrC0hmT87Og/exec';
    const form = document.forms['Pythonquiz']
    const formData = new FormData(form);
    formData.append('marks', score); // Append marks to the form data
    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message));
    submitBtn.disabled = true;
    quizContainer.style.pointerEvents = 'none';
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

