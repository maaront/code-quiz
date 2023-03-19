// Get the results list from local storage
var storedResultsList = localStorage.getItem("quizResultsList");

if (storedResultsList) {
  // Parse the results list
  var resultsList = JSON.parse(storedResultsList);

  // Generate an ordered list with the results
  var resultsHTML = "<ol>";
  for (var i = 0; i < resultsList.length; i++) {
    resultsHTML += "<li>Time remaining: " + resultsList[i].timeLeft + " seconds</li>";
  }
  resultsHTML += "</ol>";

  // Display the ordered list on the page
  document.getElementById("results").innerHTML = resultsHTML;
} else {
  // Display a message if there are no results in local storage
  document.getElementById("results").innerHTML = "No results found.";
}




//  // Creates element based on tag entered by user
//  var tag = document.createElement(tagName);

//  // Adds text content to created tag
//  tag.textContent = "This was made via prompts. It's a " + tagName + ".";
 
//  // Appends tag as child of document body
//  document.body.appendChild(tag);
