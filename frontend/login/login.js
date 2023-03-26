const loginContainer = document.querySelector(".login-container");
const signupContainer = document.querySelector(".signup-container");

const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

/*
const signupSubmit = document.querySelector(".signup-submit");
const firstName = document.querySelector(".signup-first-name");
const lastName = document.querySelector(".signup-last-name");
const username = document.querySelector(".signup-username");
const email = document.querySelector(".signup-email");
const password = document.querySelector(".signup-password");
const profilePicture = document.querySelector(".signup-profile-picture");
*/

const userID = '';

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

function signup(event) {
  event.preventDefault();
  const form = event.target.form;
  console.log(form); // check if form is defined
  const formData = {
    username: form.signup_username.value,
    email: form.signup_email.value,
    password: form.signup_password.value,
    firstName: form.signup_firstName.value,
    lastName: form.signup_lastName.value,
    profilePicture: form.signup_profilePicture.value,
    services: [],
    balance: 0
  };

  fetch('http://localhost:8080/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    // Loop through each user object in the array
    data.forEach(user => {
      // Check if the email or username in the form matches the ones in the database
      if (user.email === form.signup_email.value || user.username === form.signup_username.value) {
        // Display an error message to the user
        alert("That email or username is already being used. Please try again with a different one.");
        // Clear the form inputs
        form.signup_email.value = "";
        form.signup_username.value = "";
        return;
      }
    });

    // If no matching user was found, submit the form
    submitForm(formData);
  })
  .catch(error => console.error(error));

  function submitForm(formData) {
    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }
}

function login(event) {
  event.preventDefault();

  fetch('http://localhost:8080/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    // Loop through each user object in the array
    data.forEach(user => {
      // Check if the email or username in the form matches the ones in the database
      if (user.password === form.signup_password.value || user.username === form.signup_username.value) {
        // Display an error message to the user
        alert("That email or username is already being used. Please try again with a different one.");
        // Clear the form inputs
        form.signup_email.value = "";
        form.signup_username.value = "";
        return;
      }
    });
  })
  .catch(error => console.error(error));
}
