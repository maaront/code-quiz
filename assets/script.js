var countdownTimer;
var timeLeft;
var countdownTimerEl = document.getElementById("countdown-timer");

function startQuiz() {
  // Get the countdown timer element
  // var countdownTimerEl = document.getElementById("countdown-timer");
  // Set the starting time in seconds
  timeLeft = 90;
  // Set the timer
  countdownTimer = setInterval(function () {
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

    // Highlight timer when time is low
    if (timeLeft < 25) {
      document.getElementById("time-container").style.color = "red";
    }
  }, 1000);

  // Disable the "Start Quiz" button
  document.getElementById("start-quiz").disabled = true;

  // Display the first quiz question and answer choices
  displayQuiz();
}

// Set the questions and answers
var correctAnswers = 0;

const quiz = [
  {
    question:
      "1. A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal", "console log", "for loops"],
    answer: 2,
  },

  {
    question: "2. Arrays in JavaScript can be used to store:",
    choices: [
      "Numbers and strings",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question:
      "3. Inside which HTML element do we put the JavaScript or link to a JavaScript file?",
    choices: [
      "&lt;script&gt;",
      "&lt;javascript&gt;",
      "&lt;js&gt;",
      "&lt;scripting&gt;",
    ],
    answer: 0,
  },
  {
    question: "4. Where is the correct place to insert JavaScript?",
    choices: [
      "The &lt;head&gt; section",
      "The &lt;body&gt; section",
      "Both the &lt;head&gt; and &lt;body&gt; sections",
      "The &lt;footer&gt; section",
    ],
    answer: 1,
  },
  {
    question:
      "5. What is the correct syntax for referring to an external script called 'abc.js'?",
    choices: [
      "&lt;script name=&ldquo;abc.js&rdquo;&gt;",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "6. Arrays in JavaScript can be used to store:",
    choices: [
      "Numbers and strings",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "7. Arrays in JavaScript can be used to store:",
    choices: [
      "Numbers and strings",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "8. Arrays in JavaScript can be used to store:",
    choices: [
      "Numbers and strings",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "9. Arrays in JavaScript can be used to store:",
    choices: [
      "Numbers and strings",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "10. Arrays in JavaScript can be used to store:",
    choices: [
      "Numbers and strings",
      "Other strings",
      "Booleans",
      "All of the above",
    ],
    answer: 3,
  },
];

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
    choicesHTML +=
      '<li><label><input type="radio" name="answer" value="' +
      i +
      '">' +
      choices[i] +
      "</label></li>";
  }
  document.getElementById("choices").innerHTML = choicesHTML;
}

// Check the user's answer and display a message
function checkAnswer() {
  // Get the user's answer
  var selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Check if an answer is selected
  if (selectedAnswer) {
    // Check if the answer is correct
    if (selectedAnswer.value == quiz[quizIndex].answer) {
      // Display a message indicating that the answer is correct
      document.getElementById("result").innerHTML = "Correct!";
      // Increment the correctAnswers count
      correctAnswers++;
    } else {
      // Display a message indicating that the answer is incorrect
      document.getElementById("result").innerHTML =
        "Incorrect. 10 seconds deducted from time remaining.";

      // Subtract 10 seconds from the countdown timer
      timeLeft -= 10;
    }
  } else {
    // Display an error message if no answer is selected
    document.getElementById("result").innerHTML = "Please select an answer.";
  }

  // Move to the next quiz question or finish the quiz
  quizIndex++;
  if (quizIndex < quiz.length) {
    // Display the next quiz question and answer choices
    displayQuiz();
  } else {
    // Clear the timer interval (pause the timer)
    clearInterval(countdownTimer);

    // Redefine timer to ensure time left shows exactly what the results show
    countdownTimerEl.innerHTML = timeLeft;
    // Save the current result
    var currentResult = {
      timeLeft: timeLeft,
    };

    // Add the current result to the list
    resultsList.push(currentResult);

    // Sort the list in descending order based on the time remaining
    resultsList.sort(function (a, b) {
      return b.timeLeft - a.timeLeft;
    });

    // Save the sorted list back to local storage
    localStorage.setItem("quizResultsList", JSON.stringify(resultsList));

    // Clear the question, choices, and submit button from the screen
    document.getElementById("question").innerHTML = "";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("submit-btn").style = "display: none";

    // Display a message indicating that the quiz is finished
    document.getElementById("result").innerHTML =
      "Quiz finished! You got " +
      correctAnswers +
      "/" +
      quiz.length +
      " correct answers. </br> Time remaining: " +
      timeLeft +
      " seconds. </br> <a href='results.html'>Click here to see your results.</a>";
  }
}

// Display the first quiz question and answer choices
//displayQuiz();

var storedResultsList = localStorage.getItem("quizResultsList");
var resultsList = storedResultsList ? JSON.parse(storedResultsList) : [];
