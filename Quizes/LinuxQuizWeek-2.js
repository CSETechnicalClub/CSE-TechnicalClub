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
    question: "Which command is used to shut down a Linux system gracefully?",
    options: ["shutdown", "reboot", "poweroff", "halt"],
    answer: "shutdown",
  },
  {
    question: "What command is used to move files or directories in Linux?",
    options: ["mv", "cp", "move", "transfer"],
    answer: "mv",
  },
  {
    question: "Which command is used to view hidden files in Linux?",
    options: ["ls -a", "ls --hidden", "hidden", "view"],
    answer: "ls -a",
  },
  {
    question: "What command is used to install software packages in Ubuntu Linux?",
    options: ["install", "apt-get", "dpkg", "upgrade"],
    answer: "apt-get",
  },
  {
    question: "Which command is used to clear the terminal screen in Linux?",
    options: ["clear", "cls", "clean", "erase"],
    answer: "clear",
  },
  {
    question: "What command is used to compress files or directories in Linux?",
    options: ["tar", "compress", "zip", "gzip"],
    answer: "tar",
  },
  {
    question: "Which command is used to decompress files or directories in Linux?",
    options: ["gunzip", "ungzip", "decompress", "extract"],
    answer: "gunzip",
  },
  {
    question: "What command is used to monitor disk space usage in Linux?",
    options: ["df", "du", "diskusage", "spacecheck"],
    answer: "df",
  },
  {
    question: "Which command is used to edit configuration files in Linux?",
    options: ["vi", "edit", "config", "settings"],
    answer: "vi",
  },
  {
    question: "What does the command 'top' show in Linux?",
    options: ["Running processes", "Memory usage", "Disk usage", "Network connections"],
    answer: "Running processes",
  },
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