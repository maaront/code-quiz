// Add styling to input when checked
function toggleStyle(radioInput) {
    var li = radioInput.parent;
  
    if (radioInput.checked) {
      li.classList.add("checked");
    } else {
      li.classList.remove("checked");
    }
  }