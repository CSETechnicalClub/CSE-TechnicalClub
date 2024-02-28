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
        window.addEventListener('beforeunload', function (e) {
          e.preventDefault();
          e.returnValue = '';
        });
    }
});


const questions = [
  {
      question: "What is the result of 2^3*2+3 mod 5 in arithmetic operations?",
      options: ["2", "3", "4", "0"],
      explanation: "First perform the exponent operation, 2^3 equals 8, then multiply by 2 results in 16. Afterwards, adding 3 leads us to 19. Finally divide by 5 and find the remainder gives us 4.",
      answer: "4",
      selectedOption: null,
  },
  {
      question: "Find the sum of the series: 1 + 2 + 3 + ... + n",
      options: ["n*(n-1)/2", "n*(n+1)/2", "n^2", "n*(n-1)"],
      explanation: "This formula calculates the sum of an arithmetic sequence where the common difference is 1, given by S_n = n*(n-1)/2.",
      answer: "n*(n-1)/2",
      selectedOption: null,
  },
  {
      question: "Simplify: sqrt(16) + sqrt(81) - sqrt(121)",
      options: ["10", "-10", "0", "1"],
      explanation: "Calculate the square roots individually: 4 + 9 - 11 = 13 - 11 = 2.",
      answer: "2",
      selectedOption: null,
  },
  {
      question: "Factorize: 24x^2y^2 - 36xy^3",
      options: ["6xy(4x - 6y)", "6x^2y(4y - 6x)", "6xy(4x - 3y)", "6x^2y(4x - 3y)"],
      explanation: "Extract the common factors: 6xy(4x - 3y).",
      answer: "6xy(4x - 3y)",
      selectedOption: null,
  },
  {
      question: "If log_5(x) = 2, what is the value of x?",
      options: ["5", "10", "25", "125"],
      explanation: "Since base 5 raised to power 2 equals x, therefore x = 5^2 = 25.",
      answer: "25",
      selectedOption: null,
  },
  {
      question: "Find the area of a circle with radius r = 7 cm.",
      options: ["14π sq.cm", "49π sq.cm", "28π sq.cm", "50π sq.cm"],
      explanation: "Area of a circle is given by A = πr², hence A = π × 7² = 49π sq.cm.",
      answer: "49π sq.cm",
      selectedOption: null,
  },
  {
      question: "John travels 30 km eastward and then turns north, traveling another 40 km. What is his displacement from the starting position?",
      options: ["50 km northeast", "50 km northwest", "30 km east, 40 km north", "50 km east"],
      explanation: "Displacement is calculated as √(east^2 + north^2), thus giving us √(30² + 40²) = 50 km northeast.",
      answer: "50 km northeast",
      selectedOption: null,
  },
  {
      question: "There are 10 apples distributed among 5 people equally. How many apples remain uneaten?",
      options: ["2", "5", "10", "0"],
      explanation: "Each person receives 10/5 = 2 apples leaving none behind.",
      answer: "0",
      selectedOption: null,
  },
  {
      question: "Consider three consecutive odd numbers X, Y, Z such that X < Y < Z. Which of the following expressions correctly relates X, Y, and Z?",
      options: ["X + Y = Z", "X + Z = Y", "Y + Z = X", "X + Y + Z = 0"],
      explanation: "Sum of three consecutive odd numbers would equal three times an odd number plus thrice itself, leading to X + Y + Z being divisible by 3.",
      answer: "X + Y + Z = 0 (modulo 3)",
      selectedOption: null,
  },
  {
      question: "A tank contains water upto half its height. When filled completely, it holds 100 liters. Determine the quantity of water currently present in the tank.",
      options: ["50 L", "100 L", "25 L", "150 L"],
      explanation: "Water fills half the tank, so its volume is 50% of total capacity, equaling 50 L.",
      answer: "50 L",
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
