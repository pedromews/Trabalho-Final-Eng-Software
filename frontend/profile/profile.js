function showSection(sectionName) {
  // Get all the profile sections
  let sections = document.getElementsByClassName("profile-section");

  // Loop through the sections and hide them all
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  // Show the section with the given name
  document.getElementById(sectionName).style.display = "block";
}

// Show the posts section by default
showSection("posts");


/* Balance */

function updateBalance() {
  // Retrieve the updated balance from the database
  let updatedBalance = 20;

  // Update the balance on the screen
  document.getElementById("balance").textContent = "₣ᑕ " + updatedBalance;
}

// Call the updateBalance function when the page is loaded
window.onload = function() {
  updateBalance();
};