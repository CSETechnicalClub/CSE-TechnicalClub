var rollNoInput = document.getElementById("rollno");
rollNoInput.addEventListener("input", function () {
    var enteredValue = rollNoInput.value;
    var uppercaseValue = enteredValue.toUpperCase();
    rollNoInput.value = uppercaseValue;
});


// Function to check if Roll Number exists in the list
async function checkRollNumber(rollNumber) {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSrBVT_PlpCXrnaCEv7INMYoxls4c_yMcO6QMgdO3DU3agum-E6E7ekpUOPdnEmB6Y6ZTqpi3Qi1-St/pub?output=csv');
    const csvData = await response.text();
    const rows = csvData.split('\n');
    const rollNumbers = rows.map(row => row.split(',')[0]); // Assuming Roll Numbers are in the first column
    return rollNumbers.includes(rollNumber);
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const rollNumber = document.getElementById('rollno').value;
    const rollNumberExists = await checkRollNumber(rollNumber);
    if (rollNumberExists) {
        alert('Already Submitted. Please wait for the next quiz.');
        window.location.href = "../Quizes.html";
    } else {
        document.getElementsByClassName('quiz')[0].style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
    }
});


const questions = [
  {
    question: "Which of the following is NOT a valid Java identifier?",
    options: ["_variableName", "myVariable123", "123variable", "$variable"],
    answer: "123variable",
    selectedOption: null,
  },
  {
    question: "What does JVM stand for in Java?",
    options: ["Java Virtual Machine", "Java Variable Manager", "Java Version Manager", "Java Visual Model"],
    answer: "Java Virtual Machine",
    selectedOption: null,
  },
  {
    question: "Which keyword is used to define a class in Java?",
    options: ["class", "interface", "new", "this"],
    answer: "class",
    selectedOption: null,
  },
  {
    question: "Which of the following is NOT a primitive data type in Java?",
    options: ["int", "float", "string", "boolean"],
    answer: "string",
    selectedOption: null,
  },
  {
    question: "What is the output of the following code?\n\nint x = 5;\nSystem.out.println(x++);",
    options: ["5", "6", "Compiles with error", "Runtime error"],
    answer: "5",
    selectedOption: null,
  },
  {
    question: "Which of the following is a valid way to declare an array in Java?",
    options: ["array[] x;", "int[] x = new int[];", "int x[] = new int[];", "int x[];"],
    answer: "int[] x = new int[];",
    selectedOption: null,
  },
  {
    question: "Which loop is guaranteed to execute at least once in Java?",
    options: ["for loop", "while loop", "do-while loop", "foreach loop"],
    answer: "do-while loop",
    selectedOption: null,
  },
  {
    question: "What is the correct way to exit a loop in Java?",
    options: ["exit", "end", "break", "terminate"],
    answer: "break",
    selectedOption: null,
  },
  {
    question: "Which keyword is used to define a constant in Java?",
    options: ["constant", "final", "static", "const"],
    answer: "final",
    selectedOption: null,
  },
  {
    question: "What is the result of 5 + 7 * 2 in Java?",
    options: ["14", "24", "19", "None of the above"],
    answer: "19",
    selectedOption: null,
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
    resultContainer.textContent = `Your score: ${score} out of ${questions.length}`;
    quizContainer.appendChild(resultContainer);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwmQsn96L_pEGIgUvbNltqRjlpKYbhAHbEeev8xHNZ_sUIGSWAjOQ6IRv1pfm81_QVM1w/exec';
    const form = document.forms['javaquiz']
    const formData = new FormData(form);
    formData.append('marks', score); // Append marks to the form data
    fetch(scriptURL, { 
    method: 'POST', 
    body: formData 
    })
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message));
    window.location.href = "../Quizes.html";
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
