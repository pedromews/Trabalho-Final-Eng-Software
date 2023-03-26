const loginContainer = document.querySelector(".login-container");
const signupContainer = document.querySelector(".signup-container");

const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

const signupSubmit = document.querySelector(".signup-submit");
const firstName = document.querySelector(".signup-first-name");
const lastName = document.querySelector(".signup-last-name");
const username = document.querySelector(".signup-username");
const email = document.querySelector(".signup-email");
const password = document.querySelector(".signup-password");
const profilePicture = document.querySelector(".signup-profile-picture");

// Add event listener to "Sign Up" link
signupLink.addEventListener("click", () => {
  console.log("fdc");
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

// Add event listener to "Sign Up" submit
signupSubmit.addEventListener("click", () => {
  // Hide login form
  loginContainer.style.display = "none";
  // Show signup form
  signupContainer.style.display = "block";
});
