//Set up timer
// Set the starting time in seconds
var timeLeft = 90;

// Get the countdown timer element
var countdownTimerEl = document.getElementById("countdown-timer");

// Set up the timer interval
var countdownTimer = setInterval(function() {
  // Display the current time left in the HTML element
  countdownTimerEl.innerHTML = timeLeft;

  // Subtract one second from the time left
  timeLeft--;

  // Check if the time has run out
  if (timeLeft < 0) {
    // Clear the timer interval
    clearInterval(countdownTimer);

    // Display a message indicating that the time has run out
    countdownTimerEl.innerHTML = "Time's up!";
  }
}, 1000);

// Set the questions and answers
var correctAnswers = 0;

const quiz = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal", "console log", "for loops"],
        answer: 2 
    },

    {
        question: "Arrays in JavaScript can be used to store:",
        choices: ["Numbers and strings", "Other strings", "Booleans", "All of the above"],
        answer: 3
    },
  
]

// Set the starting quiz index to 0
var quizIndex = 0;

// Display the current quiz question and answer choices
function displayQuiz() {

  document.getElementById("quiz-intro").style = "display: none";
  document.getElementById("submit-btn").style = "display: inline";

  // Get the current quiz question and answer choices
  var question = quiz[quizIndex].question;
  var choices = quiz[quizIndex].choices;

  // Display the current quiz question and answer choices in the HTML
  document.getElementById("question").innerHTML = question;

  var choicesHTML = "";
  for (var i = 0; i < choices.length; i++) {
    choicesHTML += '<li><label><input type="radio" name="answer" value="' + i + '">' + choices[i] + '</label></li>';
  }
  document.getElementById("choices").innerHTML = choicesHTML;
}