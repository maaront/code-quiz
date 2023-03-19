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