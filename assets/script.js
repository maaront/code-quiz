// Set global veriables
var countdownTimer;
var timeLeft = 90;
var countdownTimerEl = document.getElementById("countdown-timer");
var storedResultsList = localStorage.getItem("quizResultsList");
var resultsList = storedResultsList ? JSON.parse(storedResultsList) : [];
  // Set the starting quiz index to 0
 var quizIndex = 0;
var correctAnswers = 0;

// Set the questions and answers
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
  
];

// Start the quiz
function startQuiz() {
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
      // If so, pause the timer
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

// Display the current quiz question and answer choices
function displayQuiz() {
  // Now that the quiz has started, hide the intro text
  document.getElementById("quiz-intro").style = "display: none";
  // And display the Submit Button
  document.getElementById("submit-btn").style = "display: inline";

  // Get the current quiz question and answer choices
  var question = quiz[quizIndex].question;
  var choices = quiz[quizIndex].choices;

  // Display the current quiz question and answer choices in the HTML
  document.getElementById("question").innerHTML = question;
  // Set choicesHTML variable and mark as empty
  var choicesHTML = "";
  // Loop to move through list of questions and choices
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
  // Get the audio elements
  const correctSound = document.getElementById('correct-sound');
  const incorrectSound = document.getElementById('incorrect-sound');
  // Create selectedAnswer variable to get the user's answer from input
  var selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Check if no answer is selected
  if (!selectedAnswer) {
    // Display an error message if no answer is selected
    document.getElementById("result").innerHTML = "Please select an answer.";
    return; // Add this line to prevent moving to the next question
  }
    // Check if the answer is correct
    if (selectedAnswer.value == quiz[quizIndex].answer) {
      // Display a message indicating that the answer is correct
      document.getElementById("result").innerHTML = "Correct!";
      // Increment the correctAnswers count
      correctAnswers++;
      // Play the correct sound
      correctSound.play();
    } else {
      // Display a message indicating that the answer is incorrect
      document.getElementById("result").innerHTML =
        "Incorrect. 10 seconds deducted from time remaining.";
      // Subtract 10 seconds from the countdown timer
      timeLeft -= 10;
      // Play the incorrect sound
      incorrectSound.play();
    }

  // Move to the next quiz question or finish the quiz
  // Increment the quizIndex
  quizIndex++;
  // If quizIndex is less than the length of the quiz...
  if (quizIndex < quiz.length) {
    // Display the next quiz question and answer choices
    displayQuiz();
  } else {
    // The quiz is over, clear the timer interval (pause the timer)
    clearInterval(countdownTimer);

    // Redefine timer to ensure time left shows exactly what the results show
    countdownTimerEl.innerHTML = timeLeft;

    // Save the sorted list back to local storage
    localStorage.setItem("quizResultsList", JSON.stringify(resultsList));

    // Clear the question, choices, and submit button from the screen
    document.getElementById("question").innerHTML = "";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("submit-btn").style = "display: none";

    // Unhide the results sections
    document.getElementById("result").style = "display: inline";

    // Display a message indicating that the quiz is finished
    document.getElementById("result").innerHTML =
      "Quiz finished! You got " +
      correctAnswers +
      "/" +
      quiz.length +
      " correct answers. </br> Time remaining: " +
      timeLeft +
      " seconds.";
      // Show the initials form
      document.getElementById("initials-form").style.display = "inline";
  }
}

// Function to get initials and add them to the time
function saveInitials() {
  // Get the user's initials from the text input
  var initials = document.getElementById("initials").value;

  // Save the current result with initials and time left
  var currentResult = {
    initials: initials,
    timeLeft: timeLeft,
  };

  // Add the current result to the results list
  resultsList.push(currentResult);

  // Sort the list in descending order based on the time remaining
  resultsList.sort(function (a, b) {
    return b.timeLeft - a.timeLeft;
  });

  // Save the sorted list back to local storage
  localStorage.setItem("quizResultsList", JSON.stringify(resultsList));
}


