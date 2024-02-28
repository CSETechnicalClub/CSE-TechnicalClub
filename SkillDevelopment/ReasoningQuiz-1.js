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
        question: "Tom moves 10 steps towards North direction, then he makes a left turn and walks 5 steps. Where is Tom now located with respect to his original position?",
        options: ["East", "West", "South", "North"],
        explanation: "After moving 10 steps toward North initially, Tom changes direction to West making a left turn and walking 5 steps.",
        answer: "West",
        selectedOption: null,
    },
    {
        question: "Pointing to a photograph, John says, `He is my father`s son.` Who is in the picture?",
        options: ["John himself", "John`s brother", "Someone else", "Cannot determine"],
        explanation: "'He' refers to John himself because John is saying it.",
        answer: "John himself",
        selectedOption: null,
    },
    {
        question: "If every alternate word in the sentence `She loves reading books` is deleted, what remains?",
        options: ["Sh reads bk", "She lov es boo ks", "She lo ves r ead ing b ooks", "Cannot delete words like this"],
        explanation: "Deleting alternating words yields: She lov es boo ks.",
        answer: "She lov es boo ks",
        selectedOption: null,
    },
    {
        question: "One morning, Anne saw her mother standing at the mirror with her hair undressed. From this observation, she concluded that her mother had woken up early today. Why did she think so?",
        options: ["Because mothers usually dress their hair late in the day", "Anne assumed her mom woke up early based on observing undressed hair", "Mothers generally prefer dressing their hair at night", "Maybe she knew her mom was going somewhere special"],
        explanation: "Anne observed her mother's usual routine disrupted, prompting her assumption.",
        answer: "Anne assumed her mom woke up early based on observing undressed hair",
        selectedOption: null,
    },
    {
        question: "You see five stones arranged vertically in front of you, marked 1 through 5. Each stone weighs 1 kilogram except one which weighs 2 kg. Without knowing which stone weighs differently, pick two stones whose weights when combined will definitely give you a unique weight compared to others.",
        options: ["Stones #1 & #3", "Stones #2 & #5", "Stones #1 & #2", "It is impossible to choose two stones meeting those requirements"],
        explanation: "Weighing Stones #1 and #2 against Stone #2 guarantees either the combination weighs heavier (when Stone #2 is 2 kg) or lighter (when Stone #1 is 2 kg) than the others.",
        answer: "Stones #1 & #2",
        selectedOption: null,
    },
    {
        question: "Complete the series: P, Q, R, _, C, D, E, _",
        options: ["A", "F", "S", "B"], 
        explanation: "The missing letters fill in alphabetical order skipping one place: T, B.",
        answer: "T, B",
        selectedOption: null,
    },
    {
        question: "A man introduced a woman to his wife as the sister of mine. How is the woman related to him?",
        options: ["Sister", "Wife", "Daughter", "Could be anyone depending on context"],
        explanation: "`Sister of mine` indicates a sibling relationship.",
        answer: "Sister",
        selectedOption: null,
    },
    {
        question: "Which sequence is arranged in ascending order?",
        options: ["[12, 18, 27, 36, 4, 9]", "[4, 9, 12, 18, 27, 36]", "[18, 36, 9, 27, 12, 4]", "[4, 9, 18, 27, 36, 12]"],
        explanation: "Sorting the numbers from smallest to largest produces: [4, 9, 12, 18, 27, 36].",
        answer: "[4, 9, 12, 18, 27, 36]",
        selectedOption: null,
    },
    {
        question: "Given the diagram below, identify the shape formed by combining Shape A and Shape B?",
        imageUrl: "<insert URL>",
        options: ["Circle", "Triangle", "Square", "Rectangle"],
        explanation: "Shape A forms a triangle and Shape B contributes a rectangle portion creating a trapezoid.",
        answer: "Trapezoid",
        selectedOption: null,
    },
    {
        question: "Who is telling the truth?\nPerson A: Person B lied.\nPerson B: Both persons A and B told lies.",
        options: ["Neither A nor B tells the truth", "Only person A speaks the truth", "Only person B speaks the truth", "Insufficient info to decide"],
        explanation: "If B lied means neither A nor B lied contradicts B's claim, implying only A spoke the truth.",
        answer: "Only person A speaks the truth",
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
