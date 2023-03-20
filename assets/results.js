// Get the results list from local storage
var storedResultsList = localStorage.getItem("quizResultsList");

if (storedResultsList) {
  // Parse the results list
  var resultsList = JSON.parse(storedResultsList);

  // Generate an ordered list with the results
  var resultsHTML = "<ol>";
  for (var i = 0; i < resultsList.length; i++) {
    resultsHTML +=
    "<li>" +
    resultsList[i].initials + ": " + resultsList[i].timeLeft + " seconds</li>";
  }
  resultsHTML += "</ol>";

  // Display the ordered list on the page
  document.getElementById("results").innerHTML = resultsHTML;
} else {
  // Display a message if there are no results in local storage
  document.getElementById("results").innerHTML = "No results found.";
  document.getElementById("clear-scores").style = "display: none";
}

// Clear scores
function clearScores() {
  localStorage.removeItem("quizResultsList");
  results.innerHTML = "";
}
