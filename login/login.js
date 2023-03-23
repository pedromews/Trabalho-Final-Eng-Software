const loginContainer = document.querySelector(".login-container");
const signupContainer = document.querySelector(".signup-container");
const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

// Add event listener to "Sign Up" link
signupLink.addEventListener("click", () => {
  // Hide login form
  loginContainer.style.display = "none";
  // Show signup form
  signupContainer.style.display = "block";
});

// Add event listener to "Login" link
loginLink.addEventListener("click", () => {
  // Hide signup form
  signupContainer.style.display = "none";
  // Show login form
  loginContainer.style.display = "block";
});
