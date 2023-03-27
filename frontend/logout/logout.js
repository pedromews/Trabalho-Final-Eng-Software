// Get the Logout link element
const logoutLink = document.querySelector('#logout-button');

// Add a click event listener to the link
logoutLink.addEventListener('click', function() {
  // Clear all items from sessionStorage
  sessionStorage.clear();
  location.reload()
});