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
          const response = await fetch(`https://sistk-technical-club-db-1.onrender.com/api/students?rollno=${rollNumber}`);
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
      if (userData && userData.LinuxWeek1) {
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
          alert('You have already written the test for Linux Week 2.');
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
    question: "Which command is used to display the current directory in Linux?",
    options: ["cd", "pwd", "ls", "dir"],
    answer: "pwd",
  },
  {
    question: "What command is used to create a new directory in Linux?",
    options: ["mkdir", "touch", "cat", "mv"],
    answer: "mkdir",
  },
  {
    question: "Which command is used to list the contents of a directory in Linux?",
    options: ["ls", "dir", "list", "show"],
    answer: "ls",
  },
  {
    question: "What does the command 'rm -rf' do in Linux?",
    options: ["Remove a file", "Remove a directory", "Remove a directory and its contents recursively", "Rename a file"],
    answer: "Remove a directory and its contents recursively",
  },
  {
    question: "Which command is used to display the manual pages for other commands in Linux?",
    options: ["man", "help", "info", "manual"],
    answer: "man",
  },
  {
    question: "What command is used to copy files or directories in Linux?",
    options: ["cp", "mv", "copy", "cp -r"],
    answer: "cp",
  },
  {
    question: "Which command is used to change the permissions of a file or directory in Linux?",
    options: ["chmod", "chown", "perm", "change"],
    answer: "chmod",
  },
  {
    question: "What command is used to find files or directories in Linux?",
    options: ["search", "find", "grep", "locate"],
    answer: "find",
  },
  {
    question: "Which command is used to create a symbolic link in Linux?",
    options: ["ln", "link", "sym", "mklink"],
    answer: "ln",
  },
  {
    question: "What does the command 'grep' do in Linux?",
    options: ["Find text within files", "Delete files", "Copy files", "Move files"],
    answer: "Find text within files",
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
        const response = await fetch(`https://sistk-technical-club-db-1.onrender.com/api/students/${rollNumber}`);
    
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
    
        // Parse response data
        const userData = await response.json();
    
        if (userData) {
            // Update LinuxWeek1 score
            if (!userData.hasOwnProperty('LinuxWeek1')) {
                userData.LinuxWeek1 = score;
            } else {
                alert('You have already written the test for Linux Week 1.');
            }
    
            // Update the user's data in the database
            const updateResponse = await fetch(`https://sistk-technical-club-db-1.onrender.com/api/students/${rollNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            // Check if update was successful
            if (!updateResponse.ok) {
                throw new Error('Failed to Store the Result');
            } else {
                // Successful update
                alert('Result Stored successfully!');
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
