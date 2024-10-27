

import { score, quizData, loadQuestion, currentQuestion, checkAnswer, displayScore } from '../js/quiz.js';

const quizContainer = document.getElementById("quiz-container");
const optionsContainer = document.getElementById("optionsContainer");
const quizQuestion = document.getElementById("quizQuestion");
const submitButton = document.getElementById("submit");
const questionCountDisplay = document.getElementById("currentQuestionCount");



function storeUsername() {
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim(); // Get the username inside the function

  if (username) {
      const username_score = JSON.parse(localStorage.getItem('username_score')) || [];
      username_score.push(username);

      localStorage.setItem('username_score', JSON.stringify(username_score)); // Fix: use the same key for storage
  } else {
      alert('Please enter a valid username.');
  }
}

// Function to load a question
function displayQuestion() {
  const currentData = quizData[currentQuestion];
  quizQuestion.innerText = currentData.Question;

  optionsContainer.innerHTML = ""; // Clear previous options

  // Generate and display options as radio buttons
  currentData.Options.forEach((option, index) => {
    const optionLabel = document.createElement("label");
    optionLabel.innerHTML = `
      <input type="radio" name="option" value="${index}">
      ${option}
    `;
    optionsContainer.appendChild(optionLabel);
  });

  // Update question counter
  questionCountDisplay.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

// Initial question load
displayQuestion();

// Handle answer submission
submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    if (!selectedOption) {
      alert("Please select an answer before submitting.");
      return;
    }
  
    // Check the answer with the selected option index
    checkAnswer(selectedOption.value);
  
    // Update score display after checking the answer

  
    // Check if there are more questions or finish quiz
    if (currentQuestion < quizData.length) {
      displayQuestion(); // Load the next question
    } else {
      quizContainer.innerHTML = `<h2 id="scoreHeader">Your final score is: ${score}</h2>`;
    }
  });
  